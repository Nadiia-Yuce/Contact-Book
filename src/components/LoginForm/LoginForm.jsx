import { ErrorMessage, Field, Form, Formik } from "formik";

export default function LoginForm() {
  return (
    <Formik>
      <Form>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email" component="span" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" id="password" />
          <ErrorMessage name="password" component="span" />
        </div>
      </Form>
    </Formik>
  );
}
