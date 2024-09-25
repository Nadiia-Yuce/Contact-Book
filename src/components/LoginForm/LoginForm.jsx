import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import common from "../RegistrationForm/RegistrationForm.module.css";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
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
    dispatch(values);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="form animate__animated animate__fadeInDown">
          <div className="formGroup">
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <Field type="email" name="email" id="email" className="formInput" />
            <ErrorMessage name="email" component="span" className="error" />
          </div>
          <div className={`formGroup ${common.lastRegisterFormGroup}`}>
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <Field
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              className={`formInput ${common.password}`}
            />
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
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
}
