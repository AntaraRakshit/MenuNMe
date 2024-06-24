// src/MenuPage.js
import React, { useState } from 'react';
import IngredientCard from '../components/IngredientCard';;
import DropdownChecklist from '../components/DropdownChecklist';
import '../global/styles.css';

const categories = [
  { id: 1, name: 'Leafy Greens', image: 'path/to/leafy-greens.jpg' },
  { id: 2, name: 'Meat', image: 'path/to/meat.jpg' },
  { id: 3, name: 'Lentils', image: 'path/to/lentils.jpg' },
  { id: 4, name: 'Veggies', image: 'path/to/veggies.jpg' },
  { id: 5, name: 'Carbs', image: 'path/to/carbs.jpg' }
];

const checklistItems = [
  'External and internal research',
  'Quantitative observations on patterns',
  'Review analytics and past research',
  'Competitive landscape',
  'Existing patterns in use',
  'Constraints',
  'Concept'
];

const MenuPage = () => {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleSelection = (isSelected) => {
    setSelectedCount(prevCount => isSelected ? prevCount + 1 : prevCount - 1);
  };

  return (
    <div className="menu-page">
      <h1>Creating a New Menu</h1>
      <p>Fill out a few quick and easy steps to get an automatically generated fresh menu for the week</p>
      <div className="ingredient-list">
        {categories.map(category => (
          <IngredientCard
            key={category.id}
            name={category.name}
            image={category.image}
            onSelect={handleSelection}
          />
        ))}
      </div>
      <button className="my-pantry-button">My Pantry</button>
      <div className="selected-count">{selectedCount}/5 items selected</div>      
    </div>
  );
};

export default MenuPage;
