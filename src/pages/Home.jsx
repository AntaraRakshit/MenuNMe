import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../components/NavBar';

const Home = () => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)

    return (
        <>
        <NavBar />
            <header>
                <div id="top-header">
                    <div id="logo">
                        <img src="images/Header_Img.png" />
                    </div>
                
                </div>
                
                <div id="header-image-menu">
                </div>
            </header>
            <h1>Welcome to Menu & Me!</h1>
            {isAuthenticated ? (
                <div>
                    <h2>You are logged in!</h2>
                    <div>
                        <Link to="/pantry-page">
                            <button>Pantry Page</button>
                        </Link>
                        <Link to="/saved-meal-plans">
                            <button>My Saved Menus</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            )}
        </>
        );
};

export default Home;