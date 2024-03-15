import React, { useState, useEffect } from "react";
import RecipeList from "./list/RecipeList";

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
