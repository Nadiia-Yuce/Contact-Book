import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.loginPageContainer}>
      <h1 className={css.pageTitle}>Wellcome back! </h1>
      <LoginForm />
      <p className={css.registration}>
        Don&apos;t have an account?
        <Link to="/registration" className={css.link}>
          Sigh up
        </Link>
        now!
      </p>
    </div>
  );
}
