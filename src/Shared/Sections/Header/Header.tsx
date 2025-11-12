import type { FC } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/logo_y4.svg";
import Button from "../../Components/Button/Button";

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopRoute = location.pathname === "/shop";
  const ctaLabel = isShopRoute ? "Back home" : "Get Started";

  const handleCtaClick = () => {
    if (isShopRoute) {
      navigate("/");
    } else {
      navigate("/shop");
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} />
        </Link>
        <Button onClick={handleCtaClick}>{ctaLabel}</Button>
      </div>
    </header>
  );
};

export default Header;
