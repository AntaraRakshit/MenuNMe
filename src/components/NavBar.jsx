import './NavBar.css';
import { useAuth } from '../contexts/AuthContext';
function NavBar(){
    const { isAuthenticated, logout } = useAuth();

    return(
        <nav className='nav'>
            
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/pantry-page">Pantry Page</a>
                </li>
                <li>
                    <a href="/saved-meal-plans">Saved Meal Plans</a>
                </li>
                {isAuthenticated ? (
                    <li>
                        <a onClick={logout}>Logout</a>
                    </li>
                ):""
                }
            </ul>
        </nav>
    );
}

export default NavBar;