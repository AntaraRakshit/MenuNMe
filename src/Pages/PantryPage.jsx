import React from 'react';
import './PantryPage.css';
import IngredientList from '../components/IngredientList';

const categories = [
    { name: 'Carbs', items: ['Rice', 'Roti', 'Something'] },
    { name: 'Veggies', items: ['Carrot', 'Broccoli', 'Something'] },
    { name: 'Protein', items: ['Eggs', 'Chicken', 'Something'] },
    { name: 'Dal', items: ['Lentils', 'Split Peas', 'Something'] },
    { name: 'Dairy', items: ['Milk', 'Cheese', 'Something'] },
    { name: 'Spices', items: ['Salt', 'Pepper', 'Something'] },
    { name: 'Fruits', items: ['Apple', 'Banana', 'Something'] },
];

const PantryPage = () => {
    return (
        <div className="pantry-page">
            <header className="pantry-header">
                <h1>Enter Your Pantry Ingredients</h1>
            </header>
            <IngredientList categories={categories} />
        </div>
    );
};

export default PantryPage;
