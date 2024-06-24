// src/DropdownChecklist.js
import React, { useState } from 'react';
import './DropdownChecklist.css';

const DropdownChecklist = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-checklist">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {label}
      </button>
      {isOpen && (
        <div className="checklist">
          {items.map((item, index) => (
            <div key={index} className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <label>{item}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownChecklist;
