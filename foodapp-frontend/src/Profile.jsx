import React, { useState, useEffect } from "react";

export default function UserProfile() {
  // --- Static user data (can later come from login) ---
  const [user] = useState({
    name: "Vedika Sharma",
    age: 24,
    gender: "Female",
    location: "Pune, India",
    favorite_dish: "Paneer Tikka", // must exist in dataset
    diet_type: "Vegetarian",
    preferred_cuisine: "North Indian",
    profile_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAACUCAMAAAAJSiMLAAAARVBMVEX6+vqPj4////+GhobIyMiLi4uBgYH19fXx8fHk5OTf39+bm5vu7u59fX20tLSnp6fT09O8vLyurq6VlZXZ2dnCwsKhoaGgB9MrAAADwUlEQVR4nO2c23akIBBFsRARUfH+/586aDo9mUl3BCJQrlX7Jf24V6XkepQxgiAIgiAIgiAIgkACHOS28MHa1q1qLKqV7B7u1rIpe7PNc1HM82b6UjH04gDtaH2FEMXB/mPWq0Rdclto0z2Ev8K7CXHJoZn4C+mj6rxXOL2BrQV/LX1UfC4xFhxq86bSz4pPEp03NOLEei84tkaB5l1X/1PvApc3NIWDtfVGVW9Qs5O19d5aPN6tdrS2/W1kbttPYPph4PvmPSIpNyyVu7X1RtLeMPtYF0Kj0IbRubEf3iUCb/B4Hh/aG4KnEkpPa8uQv9zybCnyotx9/nIrj8HvicptDWuANs/eJbD5t7btktzaLKRHijmzNCivGfKTKvOGwXNif2pnnuChDGqSKvMzCWOQdu6hBPqAgcRqZ16W3FU7sElya9/0kRzuOQC2Ydp1VmsWOLkXua3Bd2+zI6bsS6mQZzL3bLOvpUIG7jazNWOn58PfEVP+TVnAyC2y98hx4OBrvWUf/thdj3cYk57Vzr0je+A5wXcNimJbb+NzUJx/1/5J7T5VCjzH8ow1rmfFyC5vBsc24Vga+wNYnC74BKZa78ByflkmNK5a74DaThqFG0SXe09A9t1P1t2KMSrA9oLrdxfvojA1Tmm2ZzOG6VU4gxfTgrTUH4Bcxrn6OqoIXum1wRfJ+A9gslk177rK0nVcl0qirvSTIwDYKkvN7hcGvJkwQdwcuID0zrIZyl8yqLRxY2DLXFX811SVbtJNRaBM0Kn2qyUWn1LtHGBwjc+5wBPtHdwClu4InmJJC/Wl0gcp1of95dYifjQQnI9EPLR19E1m4EXkiXf0A285Xd/aBR8jW7M6JGR0RvxbEe+7Ayft6OeZpJ1WO0ZvR9e+6SMZEGl10I4eepVhKaOfiT9us5BM66l29JtKGCJUu1iia0dYShU6fjA6wjMppujWDNbruyTBJTyoy62LJLsyc7F0mutsqK86bfjUTnPiEBgQfWudKl7ikQw4J93LQ9dOOdGnmr/eAW82vSFp3Ouy9k6diJ4uGU7Sv/PZX+DN18TSe3+7vWz9HjHniDHCon/V4NzkycRAO55/SeBtqcWaK/IATG2BHd5tOeNHYDvFu8Xtv8hKZ345gS397HO9ILjuFwS38bZVSsPdzEUlpqFFktMAkO2gq+pndcE7boYa12d4AKAtJz1/fC/o4PlD7N880rbMKKMaR/ilGcqx743ZHhjT92M5qBp3vOTDTtZt3VrsH0mBGIIgCIIgCIIgCIII5w+WUi5WZHi8BgAAAABJRU5ErkJggg==",
  });

  // --- State for fetched data ---
  const [recentlyRated, setRecentlyRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch recommendations from backend ---
  useEffect(() => {
    console.log("🚀 Fetching recommendations for:", user.favorite_dish);

    fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite_dish: user.favorite_dish }),
    })
      .then((res) => {
        console.log("🔹 Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Backend response:", data);
        if (data.error) {
          setError(data.error);
        } else {
          setRecentlyRated(data.recently_rated || []);
          setRecommended(data.recommendations || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError("❌ Failed to connect to TasteLens backend.");
        setLoading(false);
      });
  }, [user.favorite_dish]);

  // --- Loading & error states ---
  if (loading)
    return (
      <div className="text-center text-lg text-gray-700 mt-20">
        🍽️ Loading your personalized recommendations...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-20">
        {error}
      </div>
    );

  // --- Render UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-6 flex flex-col items-center">
      {/* --- Profile Header --- */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl mb-12 text-center">
        <img
          src={user.profile_image}
          alt="User Avatar"
          className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-orange-400 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-orange-800">{user.name}</h1>
        <p className="text-gray-600 text-lg mt-2">{user.location}</p>
        <p className="text-gray-700 mt-2">
          <strong>Age:</strong> {user.age} | <strong>Gender:</strong> {user.gender}
        </p>
        <p className="text-gray-700 mt-2">
          <strong>Favorite Dish:</strong> {user.favorite_dish} 🍛
        </p>
        <p className="text-gray-700 mt-2">
          <strong>Preferred Cuisine:</strong> {user.preferred_cuisine}
        </p>
      </div>

      {/* --- Recently Rated Section --- */}
      <section className="w-full max-w-5xl mb-14">
        <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">
          ⭐ Recently Rated Dishes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recentlyRated.map((dish, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img
                src={dish.img_url || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={dish.dish_name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-orange-700 mb-1">
                  {dish.dish_name}
                </h3>
                <p><strong>Restaurant:</strong> {dish.restaurant_name}</p>
                <p><strong>Price:</strong> ₹{dish.average_cost}</p>
                <p><strong>Rating:</strong> {dish.rating} / 5</p>
                <p><strong>Diet:</strong> {dish.diet_type}</p>
                <p><strong>Calories:</strong> {dish.calories}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Recommended Section --- */}
      <section className="w-full max-w-5xl mb-10">
        <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">
          🔥 Recommended For You
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recommended.map((dish, i) => (
            <div
              key={i}
              className="bg-orange-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={dish.img_url || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={dish.dish_name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-orange-700 mb-1">
                  {dish.dish_name}
                </h3>
                <p><strong>Restaurant:</strong> {dish.restaurant_name}</p>
                <p><strong>Price:</strong> ₹{dish.average_cost}</p>
                <p><strong>Rating:</strong> {dish.rating} / 5</p>
                <p><strong>Diet:</strong> {dish.diet_type}</p>
                <p><strong>Calories:</strong> {dish.calories}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
