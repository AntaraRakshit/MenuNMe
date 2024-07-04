import React, { useContext, useState, useEffect, useRef } from 'react';
import './GeneratedMealPlan.css';
import { MealplanContext } from '../contexts/MealplanContext';
import DailyMenu from '../components/DailyMenu';
import RecipeDetails from '../components/RecipeDetails';

const GeneratedMealPlan = () => {
    const { responseData } = useContext(MealplanContext);
    const mealPlan = responseData ? responseData.meal_plan : null;
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const recipeContainerRef = useRef(null);

    const handleDishClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleSaveClick = async () => {
        if (!selectedRecipe) return;

        const payload = {
            recipe: selectedRecipe
        };

        try {
            const response = await fetch('https://your-api-gateway-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Save response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (selectedRecipe && recipeContainerRef.current) {
            recipeContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedRecipe]);

    return (
        <div className="meal-plan-page">
            <header className="menu-header">
                <div className="menu-title">
                    <h1>Generated Meal Plan</h1>
                </div>
                <div className="save-button-container">
                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                </div>
            </header>
            <div className="daily-menus-container">
                {mealPlan ? (
                    Object.keys(mealPlan).map((day) => (
                        <DailyMenu key={day} day={day} meals={mealPlan[day]} onDishClick={handleDishClick} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {selectedRecipe && (
                <div className="recipe-save-container" ref={recipeContainerRef}>
                    <RecipeDetails recipe={selectedRecipe} />
                </div>
            )}
        </div>
    );
};

export default GeneratedMealPlan;
