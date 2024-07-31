import React from 'react';
import './MealPlanCard.css';

const MealPlanCard = ({ title, fromDate, toDate, onClick }) => {
    return (
        <div className="meal-plan-card" onClick={onClick}>
            <h2>{title}</h2>
            <p>From: {fromDate}</p>
            <p>To: {toDate}</p>
            <div className="meal-plan-details">
               {/* Existing meal plan details if needed */}
            </div>
        </div>
    );
};

export default MealPlanCard;
