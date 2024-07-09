import React from 'react';
import './MealPlanCard.css';

const MealPlanCard = ({ title, fromDate, toDate, mealPlan }) => {
    return (
        <div className="meal-plan-card">
            <h2>{title}</h2>
            <p>From: {fromDate}</p>
            <p>To: {toDate}</p>
            <div className="meal-plan-details">
                {/* {Object.entries(mealPlan).map(([day, meals], index) => (
                    <div key={index}>
                        <h4>{day}</h4>
                        <ul>
                            {meals.map((meal, idx) => (
                                <li key={idx}>{meal}</li>
                            ))}
                        </ul>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default MealPlanCard;
