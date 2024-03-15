import React from "react";
import { FaStar, FaTrashAlt } from "react-icons/fa";

const RecipeList = ({
  recipes,
  onFavoriteToggle,
  onRemoveFavorite,
  isFavoritePage = false,
  onRecipeSelect,
}) => {
  if (recipes.length === 0) {
    return <div className="text-center py-4">No recipes found...</div>;
  }

  return (
    <ul className="mt-4 space-y-4">
      {recipes.map((recipe) => (
        <li
          key={recipe.id}
          className="flex justify-between items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
        >
          <span
            className="font-medium dark:text-gray-200 cursor-pointer"
            onClick={() => onRecipeSelect(recipe)}
          >
            {recipe.name}
          </span>
          {isFavoritePage ? (
            <button
              onClick={() => onRemoveFavorite(recipe.id)}
              className="bg-red-200 hover:bg-red-300 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaTrashAlt />
            </button>
          ) : (
            <button
              onClick={() => onFavoriteToggle(recipe.id)}
              className={`py-2 px-4 rounded ${
                recipe.isFavorite
                  ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaStar
                className={`${
                  recipe.isFavorite ? "text-slate-800" : "text-gray-400"
                }`}
              />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
