import './NavBar.css';
function NavBar(){
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
            </ul>
        </nav>
    );
}

export default NavBar;