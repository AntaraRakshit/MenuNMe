import React, { useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../configs/UserPool";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"; // Import useAuth from the context

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser, setIsAuthenticated} = useAuth(); // Access setIsAuthenticated and setUser

    useEffect(() => {
        const storedSession = localStorage.getItem("session");
        if (storedSession) {
            const session = JSON.parse(storedSession);
            const cognitoUser = new CognitoUser({
                Username: session.username,
                Pool: UserPool,
            });

            cognitoUser.getSession((err, session) => {
                if (err) {
                    console.error("getSession error:", err);
                    return;
                }

                if (session.isValid()) {
                    setSuccessMessage("Session is valid. You are logged in.");
                    setIsAuthenticated(true);
                    setUser(cognitoUser);
                }
            });
        }
    }, [setIsAuthenticated, setUser]);

    const validateForm = () => {
        if (!username || !password) {
            setErrorMessage("Both fields are required");
            return false;
        }
        return true;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess:", data);
                setSuccessMessage("Login successful!");
                setErrorMessage("");
                setLoading(false);

                // Store session information
                localStorage.setItem("session", JSON.stringify({ username, tokens: data.getIdToken().getJwtToken() }));
                setIsAuthenticated(true);
                setUser(user);
                navigate('/', { state: { from: 'auth-page' } });
            },
            onFailure: (err) => {
                console.error("onFailure:", err);
                setErrorMessage(err.message || JSON.stringify(err));
                setSuccessMessage("");
                setLoading(false);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired:", data);
                setErrorMessage("New password required.");
                setSuccessMessage("");
                setLoading(false);
            },
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    disabled={loading}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>Login</button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}            
        </div>
    );
};

export default Login;
