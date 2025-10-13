import type { FC } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/logo_y4.svg";
import Button from "../../Components/Button/Button";
import cart from "../../../assets/cart.svg";

type HeaderProps = {
  selectedCount?: number;
};

const Header: FC<HeaderProps> = ({ selectedCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopRoute = location.pathname === "/shop";
  const isCartRoute = location.pathname === "/cart";
  const showCartButton = isShopRoute || isCartRoute;
  const showCartBadge = showCartButton && selectedCount > 0;

  const handleCartClick = () => {
    if (isCartRoute) {
      navigate("/shop");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} />
        </Link>
        {showCartButton ? (
          <Button onClick={handleCartClick}>
            <span className="header-cart">
              <img className="header-cart-icon" src={cart} alt="Cart" />
              {showCartBadge && (
                <span className="header-cart-badge">{selectedCount}</span>
              )}
            </span>
          </Button>
        ) : (
          <Button onClick={() => navigate("/shop")}>Get Started</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
