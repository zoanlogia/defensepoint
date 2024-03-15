import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("recipeFavorites"));
    if (storedFavorites) setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (recipeId) => {
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("recipeFavorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Favorite Recipes
      </h2>
      {favorites.length > 0 ? (
        <ul className="space-y-4">
          {favorites.map((recipe) => (
            <li
              key={recipe.id}
              className="flex justify-between items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow dark:shadow-md"
            >
              <span className="font-medium dark:text-gray-200">
                {recipe.name}
              </span>
              <button
                onClick={() => handleRemoveFavorite(recipe.id)}
                className="bg-red-500 hover:bg-red-300 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 dark:text-gray-200">
          No favorite recipes added yet...🤌🏼
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
