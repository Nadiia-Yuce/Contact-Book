import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectEditIsOpen = state => state.contacts.editIsOpen;
export const selectDeleteIsOpen = state => state.contacts.deleteIsOpen;
export const selectCurrentContact = state => state.contacts.currentContact;

//? Складовий селектор викликається кожного разу, коли змінюється будь-яка властивість слайсу
//Складовий селектор має оголошуватися через ф-ю createSelector(), яка мемоїзує виконані обчислення і задає лише потрібні залежності. Це дозволяє уникнути зайвому виклику селектора.
//Приймає масив залежних селекторів і коллбек функцію, яка в свою чергу аргументами приймає результат виклику функцій-селекторів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, query) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);
