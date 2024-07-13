import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PantryPage.css';
import IngredientList from '../components/IngredientList';
import { MealplanContext } from '../contexts/MealplanContext';

import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';

const categories = [
    { name: 'Carbs', items: ['Rice', 'Roti', 'Something'], imagepath: 'src/images/Pantry_Carbs.jpg'},
    { name: 'Veggies', items: ['Carrot', 'Broccoli', 'Something'], imagepath: 'src/images/Pantry_Veggies.jpg' },
    { name: 'Protein', items: ['Eggs', 'Chicken', 'Something'], imagepath: 'src/images/Pantry_Protein.jpg' },
    { name: 'Dal', items: ['dal', 'Split Peas', 'Something'], imagepath: 'src/images/Pantry_Dal.png' },
    { name: 'Dairy', items: ['Milk', 'Cheese', 'Something'], imagepath: 'src/images/Pantry_Dairy.jpeg' },
    { name: 'Spices', items: ['Salt', 'Pepper', 'Something'], imagepath: 'src/images/Pantry_Spices.jpeg' },
    { name: 'Fruits', items: ['Apple', 'Banana', 'Something'], imagepath: 'src/images/Pantry_Fruits.jpg' },
];

const PantryPage = () => {
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const { setResponseData } = useContext(MealplanContext);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

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
            const response = await fetch('https://0j5utt1jg5.execute-api.ap-south-1.amazonaws.com/test/create-mealplan', {
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
            setResponseData(data); // Update the context with the response data
            navigate('/generated-meal-plan'); // Navigate to the GeneratedMealPlan page
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <NavBar />
        {isAuthenticated?(
        <div className="pantry-page">
            <header className="pantry-header">
                <h1>Enter Your Pantry Ingredients</h1>
            </header>
            <IngredientList categories={categories} onIngredientChange={handleIngredientChange} />
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>):(
                            <div>
                            <Link to="/signup">
                                <button>Sign Up</button>
                            </Link>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </div>
        )
    }
    </>
    );
};

export default PantryPage;