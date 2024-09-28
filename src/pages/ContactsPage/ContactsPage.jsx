import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { Toaster } from "react-hot-toast";
import { Grid } from "react-loader-spinner";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import RequestError from "../../components/RequestError/RequestError";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.pageTitle}>My contact book</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error ? (
        <div className={css.loader}>
          <Grid color="#fff" />
        </div>
      ) : (
        <ContactList />
      )}
      {error !== null && <RequestError />}
      <Toaster position="bottom-center" />
    </div>
  );
}
