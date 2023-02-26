// React Router DOM
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link to={'/tutorials'} className='navbar-brand'>
                    Jean Santos
                </Link>
                <div className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link to={'/tutorials'} className='nav-link'>
                            Tutorials
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/add'} className='nav-link'>
                            Add
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    )
}
