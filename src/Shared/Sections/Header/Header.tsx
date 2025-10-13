import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo_y4.svg";
import Button from "../../Components/Button/Button";
import cart from "../../../assets/cart.svg"

const Header = () => {
  const [path, setPath] = useState("");
  const location = useLocation();

  useEffect (() => {
    if (location.pathname === "/shop") {
      setPath("shop");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} />
        </Link>
        {path === "shop" ? (
          <Button onClick={() => navigate("/shop")}><img className="header-cart-icon" src={cart} alt="Cart"/></Button>
        ) : (
          <Button onClick={() => navigate("/shop")}>Get Started</Button>
        )}

        {/* <div className="header__right">
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
        </div> */}
      </div>
    </header>
  );
};

export default Header;
