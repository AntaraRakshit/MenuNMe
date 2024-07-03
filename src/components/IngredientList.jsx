import React from 'react';
import './IngredientList.css';
import IngredientCategory from './IngredientCategory';

const IngredientList = ({ categories }) => {
    return (
        <div className="ingredient-list">
            {categories.map((category, index) => (
                <IngredientCategory key={index} category={category.name} items={category.items} />
            ))}
        </div>
    );
};

export default IngredientList;
