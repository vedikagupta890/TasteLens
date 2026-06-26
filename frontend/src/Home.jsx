import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.featured_dishes) setDishes(data.featured_dishes);
        else setError("No dishes found.");
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Unable to connect to the TasteLens backend.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg text-gray-700 mt-20">
        🍲 Loading featured dishes...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-20">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center">
      {/* 🧭 Navbar */}
      <nav className="w-full bg-black shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-orange-700">🍴 TasteLens</h1>
        <div className="space-x-6 text-lg">
          <Link to="/" className="text-white hover:text-orange-600 transition">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-orange-600 transition">
            Dashboard
          </Link>
          <Link to="/profile" className="text-white hover:text-orange-600 transition">
            Profile
          </Link>
        </div>
      </nav>

      {/* 🍛 Popular Dishes Title */}
      <h2 className="text-4xl font-bold text-orange-800 mt-12 mb-8 text-center">
        🍛 Popular Dishes
      </h2>

      {/* 🖼️ Sliding Carousel (3 at once) */}
      <motion.div
        className="flex overflow-x-scroll space-x-6 pb-8 max-w-6xl px-4"
        whileTap={{ cursor: "grabbing" }}
      >
        {dishes.map((dish, i) => (
          <motion.div
            key={i}
            className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform transition hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={dish.image}
              alt={dish.food_name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-left">
              <h3 className="text-xl font-semibold text-orange-700 mb-1">
                {dish.food_name}
              </h3>
              <p className="text-gray-600">
                <strong>Restaurant:</strong> {dish.restaurant_name}
              </p>
              <p className="text-gray-600">
                <strong>Price:</strong> ₹{dish.average_cost}
              </p>
              <p className="text-gray-600">
                <strong>Rating:</strong> {dish.rating} / 5
              </p>
              <p className="text-gray-600">
                <strong>Diet:</strong> {dish.diet_type}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
