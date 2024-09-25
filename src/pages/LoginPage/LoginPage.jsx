import { CiLogin } from "react-icons/ci";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectError } from "../../redux/auth/selectors.js";

export default function LoginPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  console.log(isLoggedIn);
  console.log(error);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Successful login!");
    }

    if (error) {
      toast.error(`Login failed: ${error}`);
    }
  }, [isLoggedIn, error]);

  return (
    <div className={css.loginPageContainer}>
      <div className={css.titleWrap}>
        <h1 className="pageTitle">Please log in </h1>
        <CiLogin size={25} color="rgb(83, 83, 83)" />
      </div>
      <LoginForm />
      <Toaster position="top-right" />
    </div>
  );
}
