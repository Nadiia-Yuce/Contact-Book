import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { register } from "../../redux/auth/operations";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "./RegistrationForm.module.css";

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
      {({ touched, errors, isValid, dirty }) => (
        <Form className="form animate__animated animate__fadeInDown">
          <div className={css.wrap}>
            <Field
              type="text"
              name="name"
              as={TextField}
              label="Username"
              variant="outlined"
              sx={{ width: "250px" }}
              error={touched.name && Boolean(errors.name)}
              helperText={<ErrorMessage name="name" />}
            />
          </div>

          <div className={css.wrap}>
            <Field
              type="email"
              name="email"
              as={TextField}
              label="Email"
              variant="outlined"
              sx={{ width: "250px" }}
              error={touched.email && Boolean(errors.email)}
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
              error={touched.password && Boolean(errors.password)}
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
