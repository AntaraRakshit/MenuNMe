import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MealplanContext } from '../contexts/MealplanContext';
import { AuthContext } from '../contexts/AuthContext';
import DailyMenu from '../components/DailyMenu';
import RecipeDetails from '../components/RecipeDetails';
import './GeneratedMealPlan.css';
import NavBar from '../components/NavBar';

const GeneratedMealPlan = () => {
    const location = useLocation();
    const fromPantryPage = location.state?.from === 'pantry-page';

    const { responseData } = useContext(MealplanContext);
    // responseData.mealPlan = JSON.parse(responseData.mealPlan);
    const { user } = useContext(AuthContext);
    
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
            mealPlan: responseData.mealPlan,
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
        <>
            <NavBar />
            <div className="meal-plan-page">
                <header className="menu-header">
                    <div className="menu-title">
                        {
                        responseData.mealPlanName ? <h1>{responseData.mealPlanName}</h1> : <h1>Generated Meal Plan</h1>
                        }
                        <h3>Placeholder Instruction</h3>
                    </div>
                </header>
                <div className="daily-menus-container">
                    {responseData.mealPlan ? (
                        Object.keys(JSON.parse(responseData.mealPlan)).map((day) => (
                            <DailyMenu key={day} day={day} meals={JSON.parse(responseData.mealPlan)[day]} onDishClick={handleDishClick} />
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
                {fromPantryPage && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter meal plan name"
                            value={mealPlanName}
                            onChange={(e) => setMealPlanName(e.target.value)}
                        />
                        <div className="save-button-container">
                            <button className="save-button" onClick={handleSaveClick}>Save</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GeneratedMealPlan;
