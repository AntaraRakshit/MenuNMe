import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PantryPage.css';
import IngredientList from '../components/IngredientList';
import { MealplanContext } from '../contexts/MealplanContext';
import { useAuth } from '../contexts/AuthContext';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const PantryPage = () => {
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const { setResponseData } = useContext(MealplanContext);
    const { isAuthenticated, logout } = useAuth();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]); // Corrected to initialize as an empty array

    const fetchIngredients = async () => {
        if (!user) {
            setResponseMessage('User is not authenticated');
            return;
        }

        try {
            const response = await fetch('https://0j5utt1jg5.execute-api.ap-south-1.amazonaws.com/test/get-ingredients-master', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Network response was not ok: ${errorDetails}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            const parsedBody = JSON.parse(data.body);
            console.log('Parsed Body:', parsedBody);

            const mappedCategories = parsedBody.map(item => ({
                name: item.Category,
                items: Object.keys(item.Ingredients),
                imagepath: item.ImagePath
            }));
            
            setCategories(mappedCategories);
            console.log('Categories:', mappedCategories);
    
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Failed to fetch ingredient master.');
        }
    };

    useEffect(() => {
        console.log('User:', user);
        console.log('Is Authenticated:', isAuthenticated);
        if (user) {
            fetchIngredients();
        }
    }, [user, isAuthenticated, fetchIngredients]); // Added fetchIngredients to dependency array

    const mealPlan = {
        username: user,
        mealPlanName: "",
        mealPlan: {},
        from: "",
        to: ""
    };

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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            mealPlan.mealPlan = data.body;
            setResponseData(mealPlan); // Update the context with the response data
            navigate('/generated-meal-plan', { state: { from: 'pantry-page' } }); // Navigate to the GeneratedMealPlan page
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <NavBar />
            {isAuthenticated ? (
                <div className="pantry-page">
                    <header className="pantry-header">
                        <h1>Enter Your Pantry Ingredients</h1>
                    </header>
                    <IngredientList categories={categories} onIngredientChange={handleIngredientChange} />
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            ) : (
                <div>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default PantryPage;
