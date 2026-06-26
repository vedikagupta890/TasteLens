import pandas as pd

# Load dataset
df = pd.read_csv("C:/Users/Vedika/Documents/indian_food_recommendation_dataset.csv")

# Get unique dishes with food_id
unique_dishes = df[['food_id', 'dish_name']].drop_duplicates(subset='dish_name', keep='first')

# Save to new CSV
unique_dishes.to_csv("C:/Users/Vedika/Documents/unique_dishes.csv", index=False)

print("✅ Saved", len(unique_dishes), "unique dishes to unique_dishes.csv")
