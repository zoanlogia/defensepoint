import React, { useState, useEffect } from "react";
import mockRecipes from "../mockRecipes.json";
import RecipeModal from "./RecipeModal";
import debounce from "lodash.debounce";

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
        <ul className="mt-4 space-y-4">
          {filteredRecipes.map((recipe) => (
            <li
              key={recipe.id}
              className="flex justify-between items-center bg-white dark:bg-slate-600 p-4 rounded-lg shadow"
            >
              <span
                className="cursor-pointer hover:text-blue-600 dark:text-white/50 hover:dark:text-blue-300 font-medium"
                onClick={() => !isLoading && handleRecipeClick(recipe)}
              >
                {recipe.name}
              </span>
              <button
                className={`py-2 px-4 rounded ${
                  isFavoriteProcessing[recipe.id]
                    ? "cursor-not-allowed bg-gray-400 text-gray-700 dark:bg-slate-800 dark:text-gray-200"
                    : favorites.some((fav) => fav.id === recipe.id)
                    ? "bg-yellow-400 hover:bg-yellow-500 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  !isFavoriteProcessing[recipe.id] &&
                    handleFavoriteToggle(recipe.id);
                }}
                disabled={isFavoriteProcessing[recipe.id]}
              >
                {favorites.some((fav) => fav.id === recipe.id) ? "★" : "☆"}
              </button>
            </li>
          ))}

          {filteredRecipes.length === 0 && (
            <div className="h-screen flex justify-center items-center">
              <p className="text-center py-4">No recipes found...</p>
            </div>
          )}
        </ul>
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
