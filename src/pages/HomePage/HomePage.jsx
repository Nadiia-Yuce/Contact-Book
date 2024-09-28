import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import css from "./HomePage.module.css";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.homeContainer}>
      {isLoggedIn ? (
        <div className={css.loggedContent}>
          <h1 className={css.loggedTitle}>Who Will You Call Today? </h1>
          <Link to="/contacts">
            <CustomButton className={css.inviteBtn} variant="contained">
              Find Someone
            </CustomButton>
          </Link>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
