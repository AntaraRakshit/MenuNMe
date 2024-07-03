import React from 'react';
import './DailyMenu.css';

const DailyMenu = ({ day, meals, onDishClick }) => {
    return (
        <div className="daily-menu">
            <h2>{day}</h2>
            {meals.map((meal, index) => (
                <div key={index} className="meal">
                    <h3>{meal.name}</h3>
                    <ul>
                        {meal.dishes.map((dish, idx) => (
                            <li key={idx} onClick={() => onDishClick(dish)}>
                                {dish}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DailyMenu;
