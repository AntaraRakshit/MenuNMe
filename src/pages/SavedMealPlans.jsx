import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import MealPlanCard from '../components/MealPlanCard';
import NavBar from '../components/NavBar';
import { MealplanContext } from '../contexts/MealplanContext';

const SavedMealPlans = () => {
    const { user } = useContext(AuthContext);
    const { isAuthenticated, logout } = useAuth();
    const { setResponseData } = useContext(MealplanContext); // Access MealplanContext
    const [mealPlans, setMealPlans] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const fetchMealPlans = async () => {
        if (!user) {
            setResponseMessage('User is not authenticated');
            return;
        }

        const username = user.getUsername();
        const requestBody = { username };

        try {
            const response = await fetch('https://0j5utt1jg5.execute-api.ap-south-1.amazonaws.com/test/get-mealplans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Network response was not ok: ${errorDetails}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            const parsedBody = JSON.parse(data.body);
            console.log('Parsed Body:', parsedBody);

            setMealPlans(parsedBody);
            setResponseMessage('');
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Failed to fetch meal plans.');
        }
    };

    useEffect(() => {
        console.log('User:', user);
        console.log('Is Authenticated:', isAuthenticated);
        if (user) {
            fetchMealPlans();
        }
    }, [user, isAuthenticated]);

    const handleCardClick = (plan) => {
        setResponseData(plan); // Update MealplanContext
        navigate('/generated-meal-plan');
    };

    return (
        <>
            <NavBar />
            {isAuthenticated ? (
                <div>
                    <h1>Saved Meal Plans</h1>
                    <p>Welcome, {user && user.getUsername()}</p>
                    {responseMessage && <p>{responseMessage}</p>}
                    <div>
                        {mealPlans.length > 0 ? (
                            mealPlans.map((plan, index) => (
                                <div key={index} onClick={() => handleCardClick(plan)}>
                                    <MealPlanCard
                                        title={plan.mealPlanName}
                                        fromDate={plan.from_date}
                                        toDate={plan.to_date}                                        
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No meal plans found.</p>
                        )}
                    </div>
                    <Link to="/">
                        <button>Exit</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <h1>Saved Meal Plans</h1>
                    <p>User is not authenticated</p>
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

export default SavedMealPlans;
