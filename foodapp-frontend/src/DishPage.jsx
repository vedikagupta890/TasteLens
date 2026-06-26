import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DishPage() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDish() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/dish/${id}`);

        if (!res.ok) {
          setError("Dish not found");
          return;
        }

        const data = await res.json();
        setDish(data);

      } catch (error) {
        setError("Failed to fetch dish details");
      }
    }

    fetchDish();
  }, [id]);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl">
        {error}
      </div>
    );
  }

  if (!dish) {
    return <div className="text-center mt-20">Loading dish…</div>;
  }

  return (
    <div className="flex h-screen w-screen bg-orange-50">

      {/* LEFT: IMAGE */}
      <div className="w-1/2 h-full">
        <img
          src={dish.img_url}
          alt={dish.dish_name}
          className="w-full h-full object-cover"
        />
      </div>
        {/* RIGHT: DETAILS + ORDER SECTION */}
        <div className="w-1/2 h-full flex flex-col justify-center px-20 bg-white shadow-xl rounded-l-3xl">

        {/* Dish Name */}
        <h1 className="text-5xl font-extrabold text-orange-700 mb-4">
            {dish.dish_name}
        </h1>

        {/* Rating + Price row */}
        <div className="flex items-center gap-8 mb-6">

            {/* Rating badge */}
            <div className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl shadow-sm">
            ⭐ {dish.rating}
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-800">
            ₹{dish.average_cost}
            </div>
        </div>

        {/* Info Card */}
        <div className="bg-orange-50 p-6 rounded-3xl shadow-inner mb-10 space-y-2 text-lg text-gray-700">

            <p><strong>Restaurant:</strong> {dish.restaurant_name}</p>
            <p><strong>Cuisine:</strong> {dish.cuisine}</p>
            <p><strong>Diet Type:</strong> {dish.diet_type}</p>
            <p><strong>Calories:</strong> {dish.calories}</p>

        </div>

        {/* ORDER SECTION */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-200">

            {/* Price + Tax info */}
            <p className="text-2xl font-bold mb-2 text-gray-900">
            ₹{dish.average_cost}
            </p>
            <p className="text-sm text-gray-500 mb-6">
            *Inclusive of all taxes
            </p>

            {/* Order button */}
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl text-xl shadow-md transition-all duration-200">
            Order Now
            </button>
        </div>

        {/* Back Link */}
        <Link
            to="/dashboard"
            className="mt-6 text-orange-600 underline text-lg"
        >
            ← Back to Dashboard
        </Link>
        </div>
    </div>
  );
}
