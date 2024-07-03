import React from 'react';
import './RecipeDetails.css';

const RecipeDetails = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-details">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="instructions">
                <h3>Instructions</h3>
                <ol>
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default RecipeDetails;
