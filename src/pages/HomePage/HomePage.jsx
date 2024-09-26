import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import Button from "@mui/material/Button";

export default function HomePage() {
  return (
    <div className={css.homeContainer}>
      <div className={css.content}>
        <h1 className={css.title}>Hello!</h1>
        <h3 className={css.subtitle}>
          Ready to create or access your contact book?
        </h3>
        <div className={css.buttons}>
          <Link to="/login">
            <Button
              className={css.btn}
              variant="contained"
              sx={{ backgroundColor: "rgba(114, 142, 168, 0.5)" }}
            >
              Log In
            </Button>
          </Link>
          <p className={css.subtitle}>or</p>
          <Link to="/registration">
            <Button
              className={css.btn}
              variant="contained"
              sx={{ backgroundColor: "rgba(114, 142, 168, 0.5)" }}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <h3>Who Will You Call Today? </h3> */
}
