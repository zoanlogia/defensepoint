import React from "react";

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">
            {recipe.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            &times;
          </button>
        </div>
        <ul className="list-disc list-inside mb-4 dark:text-gray-200">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeModal;
