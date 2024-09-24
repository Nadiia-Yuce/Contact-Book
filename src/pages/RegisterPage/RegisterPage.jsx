import { useSelector } from "react-redux";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegisterPage.module.css";
import { selectError, selectIsLoggedIn } from "../../redux/auth/selectors";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

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
      <h1 className={css.pageTitle}>Registration ✍🏻 </h1>
      <RegistrationForm />
      <Toaster position="top-right" />
    </div>
  );
}
