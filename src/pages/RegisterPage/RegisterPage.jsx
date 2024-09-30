import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectError, selectIsLoggedIn } from "../../redux/auth/selectors";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import toast from "react-hot-toast";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("You are registered!");
    }

    if (error) {
      toast.error(`Registration failed: ${error}`);
    }
  }, [isLoggedIn, error]);

  return (
    <div className={css.registerPageContainer}>
      <h1 className={css.pageTitle}>Create your accoun </h1>
      <RegistrationForm />
      <p className={css.login}>
        Already have an account?
        <Link to="/login" className={css.link}>
          Log in
        </Link>
        !
      </p>
    </div>
  );
}
