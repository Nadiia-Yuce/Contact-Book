import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";
import DeleteModal from "../DeleteModal/DeleteModal";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const filteredContacts = useSelector(selectFilteredContacts);
  const [isRemoving, setIsRemoving] = useState(null);

  const handleConfirmDelete = id => {
    setIsRemoving(id);
  };

  //   всередині ліста мепаємо початковий масив контактів, малюємо лішку з ключем
  // в Contact пропсом кидаємо ітерований обʼєкт масиву
  return (
    <div>
      {contacts.length === 0 && !error && !isLoading ? (
        <p className={css.warning}>You have no contacts yet!</p>
      ) : filteredContacts.length === 0 && !error && !isLoading ? (
        <p className={css.warning}>
          There are no contacts matching your query!
        </p>
      ) : (
        <ul className={css.list}>
          {filteredContacts.map(contact => (
            <li
              key={contact.id}
              className={`${css.item} animate__animated animate__fadeInUp`}
            >
              <Contact
                contact={contact}
                isRemoving={isRemoving === contact.id}
              />
            </li>
          ))}
        </ul>
      )}
      <DeleteModal onRemove={handleConfirmDelete} />
    </div>
  );
}
