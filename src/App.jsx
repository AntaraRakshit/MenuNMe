import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import PantryPage from './Pages/PantryPage';
import GeneratedMealPlan from './Pages/GeneratedMealPlan';
import { MealplanProvider } from './contexts/MealplanContext';
import './App.css';

function App() {
    return (
        <MealplanProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/pantry-page" element={<PantryPage />} />
                    <Route path="/generated-meal-plan" element={<GeneratedMealPlan />} />
                </Routes>
            </Router>
        </MealplanProvider>
    );
}

export default App;
