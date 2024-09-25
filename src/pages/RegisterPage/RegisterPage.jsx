import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { selectError, selectIsLoggedIn } from "../../redux/auth/selectors";
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
      <h1 className={`pageTitle ${css.title}`}>Create your account ✍🏻 </h1>
      <RegistrationForm />
      <Toaster position="top-right" />
    </div>
  );
}
