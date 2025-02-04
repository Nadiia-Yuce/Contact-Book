import { Link } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <div className={css.registerPageContainer}>
      <h1 className={css.pageTitle}>Create your account </h1>
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
