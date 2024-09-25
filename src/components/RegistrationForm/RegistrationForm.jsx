import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "./RegistrationForm.module.css";
import "../../index.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short! Minimum 3 letters.")
      .max(50, "Too long! Maximum 50 letters.")
      .required("Username is required!"),
    email: Yup.string().email("Invalid email!").required("Email is required!"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &, #)."
      )
      .required("Password is required!"),
  });

  const handleSubmit = values => {
    dispatch(register(values));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty }) => (
        <Form className="form animate__animated animate__fadeInDown">
          <div className={`formGroup ${css.registerFormGroup}`}>
            <label htmlFor="name" className="formLabel">
              Username
            </label>
            <Field name="name" id="name" className="formInput" />
            <ErrorMessage name="name" component="span" className="error" />
          </div>

          <div className={`formGroup ${css.registerFormGroup}`}>
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <Field type="email" name="email" id="email" className="formInput" />
            <ErrorMessage name="email" component="span" className="error" />
          </div>

          <div className={`formGroup ${css.lastRegisterFormGroup}`}>
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <Field
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              className={`formInput ${css.password}`}
              style={{ position: "relative" }}
            />

            {/* Іконка для показу/приховування пароля */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.passwordToggleBtn}
            >
              {isPasswordVisible ? <FiEye size={15} /> : <FiEyeOff size={15} />}
            </button>

            <ErrorMessage name="password" component="span" className="error" />
          </div>

          <button
            type="submit"
            className="formBtn"
            disabled={!isValid || !dirty}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}
