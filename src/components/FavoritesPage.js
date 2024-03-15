import React, { useState, useEffect } from "react";
import RecipeList from "./list/RecipeList";

const FavoritesPage = () => {
  // State for storing the user's favorite recipes
  const [favorites, setFavorites] = useState([]);

  // Effect to load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("recipeFavorites"));
    // If there are stored favorites, update the state
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Function to handle removing a recipe from favorites
  const handleRemoveFavorite = (recipeId) => {
    // Filter out the recipe that matches the recipeId
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.id !== recipeId
    );
    // Update the favorites state with the filtered list
    setFavorites(updatedFavorites);
    // Update localStorage with the new list of favorites
    localStorage.setItem("recipeFavorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Favorite Recipes
      </h2>
      {favorites.length > 0 ? (
        // Inside FavoritesPage component, replace the recipe list rendering logic with:
        <RecipeList
          recipes={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          isFavoritePage={true}
        />
      ) : (
        <p className="mt-4 dark:text-gray-200">
          No favorite recipes added yet...🤌🏼
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
