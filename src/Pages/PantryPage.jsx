import React, { useState } from 'react';
import './PantryPage.css';
import IngredientList from '../components/IngredientList';

const categories = [
    { name: 'Carbs', items: ['Rice', 'Roti', 'Something'] },
    { name: 'Veggies', items: ['Carrot', 'Broccoli', 'Something'] },
    { name: 'Protein', items: ['Eggs', 'Chicken', 'Something'] },
    { name: 'Dal', items: ['Lentils', 'Split Peas', 'Something'] },
    { name: 'Dairy', items: ['Milk', 'Cheese', 'Something'] },
    { name: 'Spices', items: ['Salt', 'Pepper', 'Something'] },
    { name: 'Fruits', items: ['Apple', 'Banana', 'Something'] },
];

const PantryPage = () => {
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [responseData, setResponseData] = useState(null);

    const handleIngredientChange = (category, item, isChecked) => {
        setSelectedIngredients((prevState) => {
            const newState = { ...prevState };
            if (isChecked) {
                if (!newState[category]) {
                    newState[category] = [];
                }
                newState[category].push(item);
            } else {
                newState[category] = newState[category].filter((i) => i !== item);
                if (newState[category].length === 0) {
                    delete newState[category];
                }
            }
            return newState;
        });
    };

    const handleSubmit = async () => {
        const payload = {
            ingredients: selectedIngredients
        };

        try {
            const response = await fetch("https://34h0hdhgzh.execute-api.ap-south-1.amazonaws.com/test/mealplans/create-mealplan", {
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
            setResponseData(data); // Update the state with the response data
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="pantry-page">
            <header className="pantry-header">
                <h1>Enter Your Pantry Ingredients</h1>
            </header>
            <IngredientList categories={categories} onIngredientChange={handleIngredientChange} />
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
            {responseData && (
                <div className="response-data">
                    <h2>Response Data</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PantryPage;
