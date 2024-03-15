import React, { useState, useEffect } from "react";
import mockRecipes from "../mockRecipes.json";
import RecipeModal from "./modal/RecipeModal";
import debounce from "lodash.debounce";
import RecipeList from "./list/RecipeList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteProcessing, setIsFavoriteProcessing] = useState({});

  const debouncedSearch = debounce((term) => {
    const results = term
      ? mockRecipes.filter((recipe) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(term.toLowerCase())
          )
        )
      : mockRecipes;
    setFilteredRecipes(results);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("recipeFavorites"));
    if (storedFavorites) setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleRecipeClick = (recipe) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
      setIsLoading(false);
    }, 500);
  };

  const handleFavoriteToggle = (recipeId) => {
    if (isFavoriteProcessing[recipeId]) return;
    setIsFavoriteProcessing((prev) => ({ ...prev, [recipeId]: true }));
    const isAlreadyFavorite = favorites.some((fav) => fav.id === recipeId);
    setTimeout(() => {
      if (isAlreadyFavorite) {
        setFavorites(favorites.filter((fav) => fav.id !== recipeId));
      } else {
        const recipeToAdd = mockRecipes.find(
          (recipe) => recipe.id === recipeId
        );
        setFavorites([...favorites, recipeToAdd]);
      }
      setIsFavoriteProcessing((prev) => ({ ...prev, [recipeId]: false }));
    }, 300);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        className="form-input mt-1 block w-full rounded-md border-gray-300 dark:bg-slate-600 shadow-sm p-2"
        type="search"
        placeholder="Enter ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={isLoading}
      />

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div onClick={() => handleRecipeClick}>
          <RecipeList
            recipes={filteredRecipes.map((recipe) => ({
              ...recipe,
              isFavorite: favorites.some((fav) => fav.id === recipe.id),
            }))}
            onFavoriteToggle={handleFavoriteToggle}
            onRecipeSelect={handleRecipeSelect}
          />
        </div>
      )}
      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default SearchPage;
