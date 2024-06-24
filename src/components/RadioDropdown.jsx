// src/RadioDropdown.js
import React, { useState } from 'react';
import './RadioDropdown.css';

const RadioDropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="radio-dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {label}
      </button>
      {isOpen && (
        <div className="options">
          {options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadioDropdown;
