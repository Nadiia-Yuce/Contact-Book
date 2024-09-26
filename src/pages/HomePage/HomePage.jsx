import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { CustomButton } from "../../components/CustomButton/CustomButton";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <div className={css.homeContainer}>
      <div className={css.content}>
        {isLoggedIn ? (
          <>
            {/* <h1 className={css.title}>{`Hello, ${user.name} !`}</h1> */}
            <h1 className={css.loggedTitle}>Who Will You Call Today? </h1>
            <Link to="/contacts">
              <CustomButton
                className={css.inviteBtn}
                variant="contained"
                // sx={{ backgroundColor: "rgba(114, 142, 168, 0.5)" }}
              >
                Find Someone
              </CustomButton>
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
