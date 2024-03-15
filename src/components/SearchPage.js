import React, { useState, useEffect } from "react";
import mockRecipes from "../mockRecipes.json";
import RecipeModal from "./RecipeModal";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const results = searchTerm
      ? mockRecipes.filter((recipe) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : mockRecipes;
    setFilteredRecipes(results);
  }, [searchTerm]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("recipeFavorites"));
    if (storedFavorites) setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleFavoriteToggle = (recipeId) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === recipeId);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== recipeId));
    } else {
      const recipeToAdd = mockRecipes.find((recipe) => recipe.id === recipeId);
      setFavorites([...favorites, recipeToAdd]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredRecipes.map((recipe) => (
          <li
            key={recipe.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              onClick={() => handleRecipeClick(recipe)}
              style={{ cursor: "pointer" }}
            >
              {recipe.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the modal from opening when clicking the favorite button
                handleFavoriteToggle(recipe.id);
              }}
            >
              {favorites.some((fav) => fav.id === recipe.id) ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>
      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default SearchPage;
