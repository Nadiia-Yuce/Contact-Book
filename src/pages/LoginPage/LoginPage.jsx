// import { CiLogin } from "react-icons/ci";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { selectIsLoggedIn, selectError } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Successful login!");
    }

    if (error) {
      toast.error("Login unsuccessful. Please verify your email and password.");
    }
  }, [isLoggedIn, error]);

  return (
    <div className={css.loginPageContainer}>
      <div className={css.titleWrap}>
        <h1 className="pageTitle">Wellcome back! </h1>
        {/* <CiLogin size={25} color="rgb(83, 83, 83)" /> */}
      </div>
      <LoginForm />
      <Toaster position="top-right" />
    </div>
  );
}
