import React, { useState, useEffect } from "react";
import mockRecipes from "../mockRecipes.json";
import RecipeModal from "./modal/RecipeModal";
import debounce from "lodash.debounce";
import RecipeList from "./list/RecipeList";

const SearchPage = () => {
  // State to store the current search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to store filtered recipes based on the search term
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store the currently selected recipe for displaying in the modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // State to store user's favorite recipes
  const [favorites, setFavorites] = useState([]);
  // State to manage the loading indicator while searching
  const [isLoading, setIsLoading] = useState(false);
  // State to manage which recipe's favorite button is being processed
  const [isFavoriteProcessing, setIsFavoriteProcessing] = useState({});

  // Debounced search function to filter recipes based on the search term
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

  // Effect to perform debounced search whenever the search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  // Effect to load favorite recipes from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("recipeFavorites"));
    if (storedFavorites) setFavorites(storedFavorites);
  }, []);

  // Effect to update localStorage whenever the favorites state changes
  useEffect(() => {
    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to handle clicking on a recipe, which opens the modal with its details
  const handleRecipeClick = (recipe) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
      setIsLoading(false);
    }, 500);
  };

  // Function to toggle the favorite status of a recipe
  const handleFavoriteToggle = (recipeId) => {
    if (isFavoriteProcessing[recipeId]) return;
    setIsFavoriteProcessing((prev) => ({ ...prev, [recipeId]: true }));
    const isAlreadyFavorite = favorites.some((fav) => fav.id === recipeId);
    setTimeout(() => {
      setFavorites((prev) =>
        isAlreadyFavorite
          ? prev.filter((fav) => fav.id !== recipeId)
          : [...prev, mockRecipes.find((recipe) => recipe.id === recipeId)]
      );
      setIsFavoriteProcessing((prev) => ({ ...prev, [recipeId]: false }));
    }, 300);
  };

  // Function to handle selecting a recipe. It's similar to handleRecipeClick and could be merged or refactored.
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
