import { useSelector } from "react-redux";
import { selectError } from "../../redux/contacts/selectors";
import css from "./RequestError.module.css";

export default function RequestError() {
  const error = useSelector(selectError);

  //! Тут треба подумати як виводити помилки для розробників
  // console.log(error);
  // console.log(import.meta.env.MODE);
  // console.log(typeof error);
  // {
  //   console.log(
  //     "Render dev mode check: ",
  //     import.meta.env.MODE === "development",
  //     "Error: ",
  //     error
  //   );
  // }

  return (
    <>
      <p
        className={css.requestError}
      >{`Oops... Something went wrong! Please, try again later :)`}</p>

      {/* Це повідомлення буде доступним тільки для розробників */}
      {import.meta.env.MODE === "development" && error && (
        <p className={css.requestError}>Error details: {error}</p>
      )}
    </>
  );
}
