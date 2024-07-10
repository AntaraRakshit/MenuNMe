import React from 'react';
import './IngredientList.css';
import IngredientCategory from './IngredientCategory';

const IngredientList = ({ categories, onIngredientChange }) => {
    return (
        <div className="ingredient-list">
            {categories.map((category) => (
                <IngredientCategory                    
                    category={category.name}
                    items={category.items}
                    catImage={category.imagepath}
                    onIngredientChange={onIngredientChange}
                />
            ))}
        </div>
    );
};

export default IngredientList;
