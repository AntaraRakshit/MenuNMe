// src/GeneratedMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneratedMenu.css';

const GeneratedMenu = () => {
  const navigate = useNavigate();

  const handleSaveAndExit = () => {
    // Handle saving and exiting logic here
    navigate('/');
  };

  const handleRegenerate = () => {
    // Handle regenerating the menu here
    navigate('/menupage');
  };

  return (
    <div className="generated-menu">
      <h1>Your New Menu</h1>
      <p>This is the menu we have come up with for you based on your specifications and ingredient requirements.</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Breakfast</td>
            <td>meal1</td>
            <td>meal1</td>
            <td>meal1</td>
            <td>meal1</td>
            <td>meal1</td>
            <td>meal1</td>
            <td>meal1</td>
          </tr>
          <tr>
            <td>Lunch</td>
            <td>meal2</td>
            <td>meal2</td>
            <td>meal2</td>
            <td>meal2</td>
            <td>meal2</td>
            <td>meal2</td>
            <td>meal2</td>
          </tr>
          <tr>
            <td>Dinner</td>
            <td>meal3</td>
            <td>meal3</td>
            <td>meal3</td>
            <td>meal3</td>
            <td>meal3</td>
            <td>meal3</td>
            <td>meal3</td>
          </tr>
        </tbody>
      </table>
      <p>
        The recipes found for you do contain some ingredients outside the ones selected by you previously. They are:
      </p>
      <ol>
        <li>Cumin</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
      </ol>
      <p>
        If it is feasible for you to purchase these and you’re happy with the week’s menu, please save and exit this page.
        If not, hit regenerate for a new menu to best suit your needs.
      </p>
      <div className="buttons">
        <button onClick={handleSaveAndExit}>Save and exit</button>
        <button onClick={handleRegenerate}>Regenerate a menu</button>
      </div>
    </div>
  );
};

export default GeneratedMenu;
