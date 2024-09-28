import { useDispatch } from "react-redux";
import { openDeleteModal, setCurrentContact } from "../../redux/contacts/slice";
import { FaPhone, FaUser } from "react-icons/fa";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";
import css from "./Contact.module.css";

export default function Contact({ contact: { name, number, id }, isRemoving }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentContact({ id, name, number }));
    dispatch(openDeleteModal());
  };

  const handleEdit = () => {
    return;
  };

  return (
    <div
      // записуємо клас за умовою видалення
      className={clsx(
        css.card,
        "animate__animated",
        isRemoving && "animate__fadeOut"
      )}
    >
      <div className={css.wrap}>
        <FaUser size={16} color="rgb(0, 0, 0, 0.6)" />
        <p className={css.text}>{name}</p>
      </div>
      <div className={css.wrap}>
        <FaPhone size={16} color="rgb(0, 0, 0, 0.6)" />
        {/* Клікабельний номер */}
        <a className={`${css.text} ${css.tel}`} href={`tel: ${number}`}>
          {number}
        </a>
      </div>
      <div className={css.delete}>
        <IconButton aria-label="delete" type="button" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className={css.edit}>
        <IconButton aria-label="edit" type="button" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
