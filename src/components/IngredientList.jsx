import React from 'react';
import './IngredientList.css';
import IngredientCategory from './IngredientCategory';

const IngredientList = ({ categories, onIngredientChange }) => {
    return (
        <div className="ingredient-list">
            {categories.map((category, index) => (
                <IngredientCategory  
                    key={index}                  
                    category={category.name}
                    items={category.items}
                    onIngredientChange={onIngredientChange}
                />
            ))}
        </div>
    );
};

export default IngredientList;
