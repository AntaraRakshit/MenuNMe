import React from 'react';
import './RecipeDetails.css';

const RecipeDetails = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-details">
            <h2>{recipe.TranslatedRecipeName}</h2>
            {recipe["image-url"] && <img src={recipe["image-url"]} alt={recipe.TranslatedRecipeName} />}
            <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {Object.entries(recipe.TranslatedIngredients).map(([ingredient, quantity], index) => (
                        <li key={index}>{`${ingredient}: ${quantity}`}</li>
                    ))}
                </ul>
            </div>
            <div className="instructions">
                <h3>Instructions</h3>
                <p>{recipe.TranslatedInstructions}</p>
            </div>
            <div className="additional-info">
                <p><strong>Cuisine:</strong> {recipe.Cuisine}</p>
                <p><strong>Course:</strong> {recipe.Course}</p>
                <p><strong>Prep Time:</strong> {recipe.PrepTimeInMins} mins</p>
                <p><strong>Cook Time:</strong> {recipe.CookTimeInMins} mins</p>
                <p><strong>Total Time:</strong> {recipe.TotalTimeInMins} mins</p>
                <p><strong>Servings:</strong> {recipe.Servings}</p>
                <p><strong>URL:</strong> <a href={recipe.URL} target="_blank" rel="noopener noreferrer">{recipe.URL}</a></p>
            </div>
        </div>
    );
};

export default RecipeDetails;
