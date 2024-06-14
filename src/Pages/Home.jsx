import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import NavBar from '../components/UI/NavBar';

const Home = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
        <NavBar />
            <h1>Welcome to Menu & Me!</h1>
            {isAuthenticated ? (
                <div>
                    <h2>You are logged in!</h2>
                    <button onClick={logout}>Logout</button>
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