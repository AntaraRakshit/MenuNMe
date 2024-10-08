import React, { useState, useEffect } from "react";
import UserPool from "../configs/UserPool";
import { CognitoUserAttribute, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"; // Ensure to import the context
import '../global/styles.css'

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated, user, setUser } = useAuth(); // Access the context

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
        if (!username || !email || !password) {
            setErrorMessage("All fields are required");
            return false;
        }
        return true;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const attributeList = [];

        const dataEmail = { Name: 'email', Value: email };
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);

        UserPool.signUp(username, password, attributeList, null, (err, data) => {
            setLoading(false);
            if (err) {
                console.error(err);
                setErrorMessage(err.message || JSON.stringify(err));
                setSuccessMessage("");
            } else {
                console.log(data);
                setUser(data.user);
                setErrorMessage("");
                setSuccessMessage("Sign up successful! Please check your email for the confirmation code.");                
            }
        });
    };

    const onConfirm = (event) => {
        event.preventDefault();
        setLoading(true);

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: UserPool,
        });

        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                console.error(err);
                setErrorMessage(err.message || JSON.stringify(err));
                setSuccessMessage("");
                setLoading(false);
            } else {
                console.log("User confirmed successfully", result);
                setErrorMessage("");
                setSuccessMessage("Account confirmed successfully! Logging you in...");

                const authDetails = new AuthenticationDetails({
                    Username: username,
                    Password: password,
                });

                cognitoUser.authenticateUser(authDetails, {
                    onSuccess: (data) => {
                        console.log("onSuccess:", data);
                        setSuccessMessage("Login successful!");
                        setErrorMessage("");
                        setLoading(false);

                        // Store session information
                        localStorage.setItem("session", JSON.stringify({ username, tokens: data.getIdToken().getJwtToken() }));
                        setIsAuthenticated(true);
                        setUser(cognitoUser);
                        setIsConfirmed(true);                        
                        navigate('/', { state: { from: 'auth-page' } });
                    },
                    onFailure: (err) => {
                        console.error("onFailure:", err);
                        setErrorMessage(err.message || JSON.stringify(err));
                        setSuccessMessage("");
                        setLoading(false);
                    },
                });
            }
        });
    };

    const onLogout = () => {
        const storedSession = localStorage.getItem("session");
        if (storedSession) {
            const session = JSON.parse(storedSession);
            const cognitoUser = new CognitoUser({
                Username: session.username,
                Pool: UserPool,
            });

            cognitoUser.signOut();
            localStorage.removeItem("session");
            setSuccessMessage("Logged out successfully.");
            setIsConfirmed(false);
        }
    };

    return (
        <div>
            {!isConfirmed && (
                <>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            disabled={loading}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={loading}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            disabled={loading}
                        />
                        <p>Password must contain at least 8 characters. Must contain at least 1 capital letter, 1 number, and 1 special character.</p>
                        <button type="submit" disabled={loading}>Sign Up</button>
                    </form>

                    {user && (
                        <form onSubmit={onConfirm}>
                            <label htmlFor="confirmationCode">Confirmation Code</label>
                            <input
                                type="text"
                                value={confirmationCode}
                                onChange={(event) => setConfirmationCode(event.target.value)}
                                disabled={loading}
                            />
                            <button type="submit" disabled={loading}>Confirm Account</button>
                        </form>
                    )}
                </>
            )}

            {isConfirmed && (
                <>
                    <p>You are logged in as {username}</p>
                    <button onClick={onLogout}>Logout</button>
                </>
            )}

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
};

export default SignUp;
