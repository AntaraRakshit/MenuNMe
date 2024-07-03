import React, { useState } from 'react';
import './GeneratedMealPlan.css';
import DailyMenu from '../components/DailyMenu';
import RecipeDetails from '../components/RecipeDetails';

const menuData = [
    { day: 'Monday', meals: [{ name: 'Lunch', dishes: ['Dish 1', 'Dish 2', 'Dish 3'] }, { name: 'Dinner', dishes: ['Dish 1', 'Dish 2', 'Dish 3'] }] },
    // Add more days and meals here
];

const GeneratedMealPlan = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleDishClick = (dish) => {
        const recipe = {
            name: dish,
            image: 'path/to/image.jpg', // Replace with actual image path
            ingredients: ['Item 1', 'Item 2', 'Item 3'],
            instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3']
        };
        setSelectedRecipe(recipe);
    };

    return (
        <div className="meal-plan-page">
            <header className="menu-header">
                <h1>Generated Meal Plan</h1>
            </header>
            <div className="daily-menus">
                {menuData.map((dayData, index) => (
                    <DailyMenu key={index} day={dayData.day} meals={dayData.meals} onDishClick={handleDishClick} />
                ))}
            </div>
            {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
        </div>
    );
};

export default GeneratedMealPlan;
