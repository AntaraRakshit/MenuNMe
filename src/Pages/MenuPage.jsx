// src/MenuPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientCard from '../components/IngredientCard';
import RadioDropdown from '../components/RadioDropdown';
import '../global/styles.css';

const categories = [
  { id: 1, name: 'Leafy Greens', image: 'path/to/leafy-greens.jpg' },
  { id: 2, name: 'Meat', image: 'path/to/meat.jpg' },
  { id: 3, name: 'Lentils', image: 'path/to/lentils.jpg' },
  { id: 4, name: 'Veggies', image: 'path/to/veggies.jpg' },
  { id: 5, name: 'Carbs', image: 'path/to/carbs.jpg' }
];


const prepTimeOptions = [
  'Less than 30 minutes',
  '30-60 minutes',
  'More than 60 minutes'
];

const dietOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'No Preference'
];

const MenuPage = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [prepTime, setPrepTime] = useState(null);
  const [diet, setDiet] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (isSelected) => {
    setSelectedCount(prevCount => isSelected ? prevCount + 1 : prevCount - 1);
  };

  const handleGenerateMenu = () => {
    navigate('/generated-menu');
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
        <div className="selected-count">{selectedCount}/5 items selected</div>
        <div className="additional-details">
          <p>Continue filling out a few more details to help us create the perfect convenient menu of your dreams.</p>
          <RadioDropdown label="Prep Time" options={prepTimeOptions} onSelect={setPrepTime} />
          <RadioDropdown label="Diet" options={dietOptions} onSelect={setDiet} />
          <button className="generate-menu-button" onClick={handleGenerateMenu}>Generate Menu</button>
        </div>
      </div>
    );
  };

export default MenuPage;
