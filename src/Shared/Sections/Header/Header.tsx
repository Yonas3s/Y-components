import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Y</span>
        </Link>
        
        <div className="header__right">
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">Home</Link>
              </li>
              <li className="header__nav-item">
                <Link to="/about" className="header__nav-link">About</Link>
              </li>
              <li className="header__nav-item">
                <Link to="/contact" className="header__nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
