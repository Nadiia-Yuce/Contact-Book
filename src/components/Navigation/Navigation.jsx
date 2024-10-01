import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <IconButton component={NavLink} to="/">
        <HomeIcon sx={{ color: "#fff", fontSize: 30 }} />
      </IconButton>
    </nav>
  );
}
