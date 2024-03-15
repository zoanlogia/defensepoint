import React, { useState, useEffect } from "react";

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
    <div>
      <h2>Favorite Recipes</h2>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <li key={recipe.id}>
              {recipe.name}
              <button onClick={() => handleRemoveFavorite(recipe.id)}>
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>No favorite recipes added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default FavoritesPage;
