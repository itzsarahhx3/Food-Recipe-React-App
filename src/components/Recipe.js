import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
    // toggle action
    const [show, setShow] = useState(false);

    const { label, image, url, ingredients } = recipe.recipe;
    return (
        <div className="recipe">
            <h2>{label}</h2>
            <img src={image} alt={label} />
            <a href={url} target="_blank" rel="noopener noreferrer">
                URL Link
            </a>
            <button onClick={() => setShow(!show)}>Ingredients</button>
            {/* if show is true, show recipe details */}
            {show && <RecipeDetails ingredients={ingredients} />}
        </div>
    );
};

export default Recipe;
