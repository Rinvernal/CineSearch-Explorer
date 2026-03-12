import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={s.header}>
      <NavLink to="/" className={s.logo}>CineSearch</NavLink>
      
      <nav className={s.navigation}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${s.navLink} ${s.active}` : s.navLink}
        >
          Home
        </NavLink>
        <NavLink 
          to="/movies" 
          className={({ isActive }) => isActive ? `${s.navLink} ${s.active}` : s.navLink}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;