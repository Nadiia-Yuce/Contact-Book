import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import css from "./ContactForm.module.css";
import "../../index.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  //початкові значення для обовʼязкового пропсу initialValues в Formik. Беруться з атрибуту name в інпутах
  const initialValues = { name: "", number: "" };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  //бібліотека для валідації "yup"; схема валідації полів; передається пропсом в Formik
  //помилки валідації візуалізуємо через компонент ErrorMessage, який додаємо до кожного філда
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short! Minimum 3 letters.")
      .max(50, "Too long! Maximum 50 letters.")
      .required("Name is required!"),
    number: Yup.string()
      .matches(/^\d{7,14}$/, "Phone number must be between 7 and 14 digits.")
      .required("Phone number is required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {/* отримання доступу до стану форми за допомогою властивостей, які Formik
      надає в межах render-функції або в children пропсі (ще можна отримати values-значення полів) */}
      {({ isValid, dirty }) => (
        <Form className={`form animate__animated animate__fadeInDown`}>
          <div className="formGroup">
            <label htmlFor="name" className="formLabel">
              Name
            </label>
            <Field name="name" id="name" className="formInput" />
            <ErrorMessage name="name" component="span" className="error" />
          </div>

          <div className="formGroup">
            <label htmlFor="number" className="formLabel">
              Number
            </label>
            <Field name="number" id="number" className="formInput" />
            <ErrorMessage name="number" component="span" className="error" />
          </div>

          <button
            type="submit"
            className="formBtn"
            disabled={!isValid || !dirty}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
