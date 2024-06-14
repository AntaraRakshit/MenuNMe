import './NavBar.css';
function NavBar(){
    return(
        <nav className='nav'>
            <a href="/" className="site-title">Site Name</a>
            <ul>
                <li>
                    <a href="/pricing">Pricing</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;