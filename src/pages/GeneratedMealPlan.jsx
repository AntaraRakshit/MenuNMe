import React, { useContext, useState, useEffect, useRef } from 'react';
import './GeneratedMealPlan.css';
import { MealplanContext } from '../contexts/MealplanContext';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import DailyMenu from '../components/DailyMenu';
import RecipeDetails from '../components/RecipeDetails';

const GeneratedMealPlan = () => {
    const { responseData } = useContext(MealplanContext);
    const { user } = useContext(AuthContext); // Access the AuthContext to get the user
    const mealPlan = responseData ? responseData.meal_plan : null;
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [mealPlanName, setMealPlanName] = useState('');
    const recipeContainerRef = useRef(null);

    const handleDishClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleSaveClick = async () => {
        if (!mealPlanName) {
            alert("Please enter a meal plan name");
            return;
        }

        const payload = {
            username: user ? user.getUsername() : null,
            mealPlanName,
            mealPlan,
            selectedRecipe
        };

        try {
            const response = await fetch('https://0j5utt1jg5.execute-api.ap-south-1.amazonaws.com/test/save-mealplan', {
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
                <input
                    type="text"
                    className="meal-plan-name-input"
                    placeholder="Enter meal plan name"
                    value={mealPlanName}
                    onChange={(e) => setMealPlanName(e.target.value)}
                />
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
