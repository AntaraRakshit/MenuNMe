import './NavBar.css';
function NavBar(){
    return(
        <nav className='nav'>
            <a href="/" className="site-title">Site Name</a>
            <ul>
                <li>
                    <a href="/pantry-page">Pantry Page</a>
                </li>
                <li>
                    <a href="/generated-meal-plan">Generated Meal Plan</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;