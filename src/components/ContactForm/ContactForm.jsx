import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = { name: "", number: "" };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    toast.success("New contact added!");
    actions.resetForm();
  };

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
