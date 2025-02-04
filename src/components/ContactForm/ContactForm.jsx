import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = { name: "", number: "" };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short! Minimum 3 letters.")
      .max(50, "Too long! Maximum 50 letters.")
      .required("Name is required!"),
    number: Yup.string()
      .matches(
        /^[+]?[\d\s()-]*$/,
        "Phone number can only contain digits, spaces, dashes, parentheses, and a plus sign."
      )
      .min(3, "Too short! Minimum 3 digits.")
      .max(17, "Too long! Maximum 17 characters.")
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
          <div className={css.wrap}>
            <Field
              name="name"
              className={css.input}
              as={TextField}
              label="Name"
              variant="outlined"
              helperText={<ErrorMessage name="name" />}
            />
          </div>

          <div className={css.wrap}>
            <Field
              name="number"
              className={css.input}
              as={TextField}
              label="Number"
              variant="outlined"
              helperText={<ErrorMessage name="number" />}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || !dirty}
            sx={{ backgroundColor: "rgb(65, 116, 177)" }}
          >
            Add contact
          </Button>
        </Form>
      )}
    </Formik>
  );
}
