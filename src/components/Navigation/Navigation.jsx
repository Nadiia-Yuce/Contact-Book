import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.navigation}>
      <IconButton component={NavLink} to="/">
        <HomeIcon sx={{ color: "#fff", fontSize: 30 }} />
      </IconButton>
      {isLoggedIn && (
        <NavLink to="/contacts" className={css.contacts}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
