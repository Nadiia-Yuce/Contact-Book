import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import css from "./HomePage.module.css";
import { Button, Fade } from "@mui/material";
import { logOut } from "../../redux/auth/operations";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <div className={css.homeContainer}>
      {isLoggedIn ? (
        <Fade in={true} timeout={1000}>
          <div>
            <Button
              variant="outlined"
              color="error"
              type="button"
              onClick={() => dispatch(logOut())}
              sx={{
                borderWidth: 2,
                position: "absolute",
                top: "16px",
                right: "16px",
              }}
            >
              Log out
            </Button>
            <div className={css.loggedContent}>
              <h1 className={css.loggedTitle}>Who Will You Call Today? </h1>
              <Link to="/contacts">
                <CustomButton className={css.inviteBtn} variant="contained">
                  Find Someone
                </CustomButton>
              </Link>
            </div>
          </div>
        </Fade>
      ) : (
        <>
          <Fade in={true} timeout={1000}>
            <div className={css.content}>
              <h1 className={css.title}>Hello!</h1>
              <h2 className={css.subtitle}>
                Ready to create or access your contact book?
              </h2>
              <div className={css.buttons}>
                <Link to="/login">
                  <CustomButton className={css.btn} variant="contained">
                    Log In
                  </CustomButton>
                </Link>
                <p className={css.subtitle}>or</p>
                <Link to="/registration">
                  <CustomButton className={css.btn} variant="contained">
                    Register
                  </CustomButton>
                </Link>
              </div>
            </div>
          </Fade>
        </>
      )}
    </div>
  );
}
