import React, { useState } from 'react';
import './IngredientCategory.css';

const IngredientCategory = ({ category, items, onIngredientChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        onIngredientChange(category, name, checked);
    };

    return (
        <div className="ingredient-category">
            <div className="category-header" onClick={toggleOpen}>
                <img src="path/to/image.jpg" alt={category} />
                <h2>{category} <span>{isOpen ? '▲' : '▼'}</span></h2>
            </div>
            {isOpen && (
                <div className="items">
                    {items.map((item, index) => (
                        <div key={index} className="item">
                            <input
                                type="checkbox"
                                id={`${category}-${item}`}
                                name={item}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={`${category}-${item}`}>{item}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IngredientCategory;
