import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { FaAddressBook } from "react-icons/fa";
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
      <div className={css.titleWrap}>
        <FaAddressBook size={35} color="#62453C" />
        <h1 className={css.pageTitle}>Contactbook</h1>
      </div>
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
