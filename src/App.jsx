import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './components/UserAuthentication/SignUp';
import Login from './components/UserAuthentication/Login';
import MenuPage from './Pages/MenuPage';
import GeneratedMenu from './Pages/GeneratedMenu';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/menupage" element={<MenuPage />} />
                <Route path="/generated-menu" element={<GeneratedMenu />} />
            </Routes>
        </Router>
    );
}

export default App;
