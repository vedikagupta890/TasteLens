from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
import os

# --- Initialize Flask App ---
app = Flask(__name__)
CORS(app)


# --- Load Dataset ---
DATA_PATH = "indian_food_recommendation_dataset_with_images.csv"

try:
    df = pd.read_csv(DATA_PATH)
    print(f"✅ Dataset loaded successfully with {len(df)} records.")
except Exception as e:
    raise RuntimeError(f"❌ Failed to load dataset: {e}")

# --- Ensure Required Columns Exist ---
required_cols = [
    "user_id", "dish_name", "rating", "restaurant_name",
    "average_cost", "diet_type", "calories", "img_url", "cuisine"
]

for col in required_cols:
    if col not in df.columns:
        df[col] = np.nan

# --- Clean & Preprocess ---
df["rating"] = pd.to_numeric(df["rating"], errors="coerce")
df = df.dropna(subset=["user_id", "dish_name", "rating"])
df["user_id"] = df["user_id"].astype(str)
df["dish_name"] = df["dish_name"].astype(str).str.strip()

# --- Collaborative Filtering Setup ---
df_cf = df[["user_id", "dish_name", "rating"]].copy()

users = df_cf["user_id"].unique()
items = df_cf["dish_name"].unique()

user_to_idx = {u: i for i, u in enumerate(users)}
item_to_idx = {item: j for j, item in enumerate(items)}
idx_to_item = {j: item for item, j in item_to_idx.items()}

rows = df_cf["user_id"].map(user_to_idx).values
cols = df_cf["dish_name"].map(item_to_idx).values
data = df_cf["rating"].values

user_item_matrix = csr_matrix((data, (rows, cols)), shape=(len(users), len(items)))

item_similarity = cosine_similarity(user_item_matrix.T, dense_output=True)
print("✅ Model initialized. Item similarity matrix shape:", item_similarity.shape)


# --- Utility: Clean NaN/NaT before jsonify ---
def clean_json(data):
    """Convert DataFrame or dict to JSON-safe structure (replace NaN with None)."""
    if isinstance(data, pd.DataFrame):
        return data.replace({np.nan: None}).to_dict(orient="records")
    elif isinstance(data, list):
        return [clean_json(item) for item in data]
    elif isinstance(data, dict):
        return {k: (None if pd.isna(v) else v) for k, v in data.items()}
    else:
        return data


# --- Routes ---
@app.route("/")
def home():
    return jsonify({
        "message": "✅ Indian Food Recommender API is active!",
        "endpoints": {"POST /recommend": {"body": {"favorite_dish": "Paneer Tikka"}}}
    })


@app.route("/recommend", methods=["GET", "POST"])
def recommend():
    if request.method == "GET":
        return jsonify({
            "message": "🪄 Use POST with JSON { 'favorite_dish': 'Paneer Tikka' } to get recommendations."
        })

    data = request.get_json()

    if not data or "favorite_dish" not in data:
        return jsonify({"error": "❌ Missing 'favorite_dish' field in request."}), 400

    favorite_dish = data["favorite_dish"]

    if favorite_dish not in df["dish_name"].values:
        return jsonify({"error": f"Dish '{favorite_dish}' not found in dataset."}), 404

    # Find dishes with similar cuisine or diet type
    dish_row = df[df["dish_name"] == favorite_dish].iloc[0]
    cuisine = dish_row.get("cuisine")
    diet_type = dish_row.get("diet_type")

    similar_dishes = df[
        (df["cuisine"] == cuisine) | (df["diet_type"] == diet_type)
    ].drop_duplicates("dish_name")

    # Remove the selected dish itself
    similar_dishes = similar_dishes[similar_dishes["dish_name"] != favorite_dish]

    if similar_dishes.empty:
        return jsonify({"error": "No similar dishes found."}), 404

    # --- Select Recommendations ---
    recommended = similar_dishes.sample(
        n=min(6, len(similar_dishes)),
        replace=False,
        random_state=42
    )

    recently_rated = df.drop_duplicates("dish_name")
    if not recently_rated.empty:
        recently_rated = recently_rated.sample(
            n=min(6, len(recently_rated)),
            replace=False,
            random_state=10
        )
    else:
        recently_rated = pd.DataFrame()

    # --- Clean JSON (fix NaN issue) ---
    response = {
        "favorite_dish": favorite_dish,
        "recommendations": clean_json(recommended),
        "recently_rated": clean_json(recently_rated)
    }

    return jsonify(response)

@app.route("/home")
def home_page():
    unique_dishes = df.drop_duplicates("dish_name")

    if unique_dishes.empty:
        return jsonify({"error": "No dishes found"}), 404

    sample_dishes = unique_dishes.sample(
        n=min(12, len(unique_dishes)),
        random_state=42
    )

    # Rename keys to match frontend expectations
    sample_dishes = sample_dishes.rename(columns={
        "dish_name": "food_name",
        "img_url": "image"
    })

    return jsonify({
        "featured_dishes": clean_json(sample_dishes)
    })

# --- Security Policy for Development ---
@app.after_request
def add_csp_headers(response):
    if app.debug or os.environ.get("FLASK_ENV") == "development":
        response.headers[
            "Content-Security-Policy"
        ] = (
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; "
            "connect-src *; "
            "img-src 'self' data: blob:; "
            "style-src 'self' 'unsafe-inline';"
        )
    return response

def convert_json_safe(obj):
    """Convert numpy/pandas types into pure Python types."""
    if isinstance(obj, dict):
        return {k: convert_json_safe(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [convert_json_safe(v) for v in obj]
    if isinstance(obj, np.integer):
        return int(obj)
    if isinstance(obj, np.floating):
        return float(obj)
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    if pd.isna(obj):
        return None
    return obj


@app.route("/dish/<dish_name>")
def dish_details(dish_name):
    # Convert URL encoded dish name (like "Rajma%20Chawal")
    dish_name = dish_name.replace("%20", " ")

    # Search dish in dataset
    dish = df[df["dish_name"].str.lower() == dish_name.lower()]

    if dish.empty:
        return jsonify({"error": f"Dish '{dish_name}' not found"}), 404

    # Take first matching row
    dish = dish.iloc[0]

    dish_info = {
        "dish_name": dish.get("dish_name"),
        "restaurant_name": dish.get("restaurant_name"),
        "average_cost": dish.get("average_cost"),
        "rating": dish.get("rating"),
        "diet_type": dish.get("diet_type"),
        "calories": dish.get("calories"),
        "cuisine": dish.get("cuisine"),
        "img_url": dish.get("img_url")
    }

    # Convert everything to pure JSON-safe types
    dish_info = convert_json_safe(dish_info)

    return jsonify(dish_info)


# --- Run App ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
