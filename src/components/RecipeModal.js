import React from "react";

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "#fff", padding: 20 }}>
        <h2>{recipe.name}</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>Insert cooking instructions here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecipeModal;
