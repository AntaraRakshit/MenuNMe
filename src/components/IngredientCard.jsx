// src/IngredientCard.js
import React, { useState } from 'react';
import DropdownChecklist from './DropdownChecklist';
import './IngredientCard.css';

const IngredientCard = ({ name, image, onSelect }) => {
  const [selected, setSelected] = useState(false);

  const toggleSelection = () => {
    setSelected(prevSelected => !prevSelected);
    onSelect(!selected);
  };

  const checklistItems = [
    'Placeholder 1',
    'Placeholder 2',
    'Placeholder 3'
  ];

  return (
    <div className={`ingredient-card ${selected ? 'selected' : ''}`} onClick={toggleSelection}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <DropdownChecklist label="Placeholder" items={checklistItems} />
      <DropdownChecklist label="Qty" items={['1', '2', '3', '4', '5']} />
    </div>
  );
};

export default IngredientCard;
