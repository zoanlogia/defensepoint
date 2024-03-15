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
  const [isFavoriteProcessing, setIsFavoriteProcessing] = useState({}); // Object to track processing state of favorite buttons by recipe ID

  // Debounce search term updates
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

  const handleRecipeClick = async (recipe) => {
    setIsLoading(true);
    // Simulate fetching detailed info with a timeout
    setTimeout(() => {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
      setIsLoading(false); // Reset loading state
    }, 500); // Simulated delay
  };

  const handleFavoriteToggle = (recipeId) => {
    if (isFavoriteProcessing[recipeId]) return; // Prevent further clicks if already processing

    setIsFavoriteProcessing((prev) => ({ ...prev, [recipeId]: true })); // Mark as processing
    const isAlreadyFavorite = favorites.some((fav) => fav.id === recipeId);

    setTimeout(() => {
      // Simulate delay for processing favorite action
      if (isAlreadyFavorite) {
        setFavorites(favorites.filter((fav) => fav.id !== recipeId));
      } else {
        const recipeToAdd = mockRecipes.find(
          (recipe) => recipe.id === recipeId
        );
        setFavorites([...favorites, recipeToAdd]);
      }
      setIsFavoriteProcessing((prev) => ({ ...prev, [recipeId]: false })); // Reset processing state
    }, 300);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={isLoading} // Disable input during loading
      />
      {isLoading ? (
        <p>Loading...</p> // Conditional rendering based on isLoading
      ) : (
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
                onClick={() => !isLoading && handleRecipeClick(recipe)} // Prevent opening modal when loading
                style={{ cursor: isLoading ? "default" : "pointer" }}
              >
                {recipe.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the modal from opening when clicking the favorite button
                  !isFavoriteProcessing[recipe.id] &&
                    handleFavoriteToggle(recipe.id);
                }}
                disabled={isFavoriteProcessing[recipe.id]} // Disable button if processing
              >
                {favorites.some((fav) => fav.id === recipe.id) ? "★" : "☆"}
              </button>
            </li>
          ))}
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
