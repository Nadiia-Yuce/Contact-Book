import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { Grid } from "react-loader-spinner";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import RequestError from "../../components/RequestError/RequestError";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const isLoading = useSelector(selectLoading);

  //HTTP запит (діспатчиться операція)
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="pageTitle">📖 My contact book</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && (
        <div className={css.loader}>
          <Grid color="rgb(124, 111, 156)" />
        </div>
      )}
      {error !== null && <RequestError />}
      <ContactList />
    </div>
  );
}
