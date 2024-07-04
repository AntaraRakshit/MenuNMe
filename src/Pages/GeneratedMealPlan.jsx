import React, { useContext, useState } from 'react';
import './GeneratedMealPlan.css';
import { MealplanContext } from '../contexts/MealplanContext';
import DailyMenu from '../components/DailyMenu';
import RecipeDetails from '../components/RecipeDetails';

const GeneratedMealPlan = () => {
    const { responseData } = useContext(MealplanContext);
    const mealPlan = responseData ? responseData.meal_plan : null;
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleDishClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    return (
        <div className="meal-plan-page">
            <header className="menu-header">
                <h1>Generated Meal Plan</h1>
            </header>
            {mealPlan ? (
                <div className="daily-menus">
                    {Object.keys(mealPlan).map((day) => (
                        <DailyMenu key={day} day={day} meals={mealPlan[day]} onDishClick={handleDishClick} />
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
        </div>
    );
};

export default GeneratedMealPlan;
