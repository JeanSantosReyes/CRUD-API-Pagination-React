import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Navbar2 = () => {

    const navRef = useRef<HTMLElement>(null);

    const showNavbar = () => {
        navRef.current!.classList.toggle(
            "responsive_nav"
        )
    };

    return (
        <header>
            <Link to={'/tutorials'} className='nav-link'>
                Jean Santos
            </Link>
            <nav ref={navRef} >
                <Link to={'/tutorials'} className='nav-link'>
                    Tutorials
                </Link>
                <Link to={'/add'} className='nav-link'>
                    Add
                </Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <i className="fa-solid fa-bars"></i>
            </button>
        </header>
    )
}
