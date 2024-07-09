import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PantryPage from './pages/PantryPage';
import GeneratedMealPlan from './pages/GeneratedMealPlan';
import SavedMealPlans from './pages/SavedMealPlans';
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
                    <Route path="/saved-meal-plans" element={<SavedMealPlans />} />
                </Routes>
            </Router>
        </MealplanProvider>
    );
}

export default App;