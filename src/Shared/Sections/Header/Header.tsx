import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src="/logo.svg" alt="Y-bits" className="header__logo-image" />
        </Link>
        
        <div className="header__right">
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">Home</Link>
              </li>
              <li className="header__nav-item">
                <Link to="/contacts" className="header__nav-link">Contacts</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
