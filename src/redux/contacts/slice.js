import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

//? Детальніше по слайсу див. коментарі нижче

const slice = createSlice({
  name: "contacts",
  initialState,

  extraReducers: builder => {
    builder
      //-----------------------GET------------------------------//

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      //-----------------------POST------------------------------//

      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })

      //----------------------DELETE-------------------------------//

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
        state.loading = false;
      })

      //--------------------pending---rejected----------------------//

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default slice.reducer;

//! Як працює слайс - екшени + редюсер

//* Створення через функцію createSlice()
//* Приймає 3 параметри:
// const slice = createSlice({
//* Імʼя слайсу (рядок)
//   name: "filters",
//* Початковий стан (обʼєкт)
//   initialState: { name: "" },
//* Кейс-Редюсери (обʼєкт): фабрики екшенів (імʼя властивості) + їх редюсери (значення))
//? Це власні редюсери слайсу
// reducers: {
//   case-reducer
// changeFilter: (state, action) => {
//! Ми можемо мутувати обʼєкти чи масиви напряму, бо у redux є бібліотека immer, яка робить копію поточного стану ї дає можливість "мутувати" його напряму
//       state.name = action.payload;
//     },
//   },
// });
//* Ще може бути властивість extraReducers (функція), яка обробляє зовнішні редюсери, які даному слайсу не належать
//? Приймає єдиний парамент builder, на якому є метод addCase(action, reducer)

//експорт головного редюсера, який буде використовуватися у файлі store.js
// export default slice.reducer;

//експорт фабрик екшенів
// export const { changeFilter } = slice.actions;
