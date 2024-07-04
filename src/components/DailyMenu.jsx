import React from 'react';
import './DailyMenu.css';

const DailyMenu = ({ day, meals, onDishClick }) => {
    if (!meals) return null;

    return (
        <div className="daily-menu">
            <h2>{day}</h2>
            {Object.keys(meals).map((mealType, index) => (
                <div key={index} className="meal">
                    <h3>{mealType}</h3>
                    <ul>
                        {Object.keys(meals[mealType]).map((dishType, idx) => {
                            const dish = meals[mealType][dishType];
                            return dish ? (
                                <li key={idx} onClick={() => onDishClick(dish)}>
                                    {dish.TranslatedRecipeName}
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DailyMenu;
