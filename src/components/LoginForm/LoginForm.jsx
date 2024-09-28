import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "./LoginForm.module.css";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";

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
    dispatch(logIn(values));
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
          <div className={css.wrap}>
            <Field
              type="email"
              name="email"
              as={TextField}
              label="Email"
              variant="outlined"
              sx={{ width: "250px" }}
              helperText={<ErrorMessage name="email" />}
            />
          </div>

          <div className={css.wrap}>
            <Field
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              as={TextField}
              label="Password"
              variant="outlined"
              sx={{ width: "250px", position: "relative" }}
              helperText={<ErrorMessage name="password" />}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? (
                          <FiEye size={15} />
                        ) : (
                          <FiEyeOff size={15} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || !dirty}
            sx={{ backgroundColor: "rgb(65, 116, 177)", width: "100px" }}
          >
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  );
}
