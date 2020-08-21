import { withFormik } from "formik";
import Login from "./Login";

const LoginContains = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    user: "",
    success: false,
  }),
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Введите ваш email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Неверный email адрес";
    }
    if (!values.password) {
      errors.password = "Введите ваш пароль";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.password)
    ) {
      errors.password = "Неверный пароль";
    }
    return errors;
  },
  handleSubmit: (values, { setSubmitting }) => {
    const users = JSON.parse(localStorage.getItem("myDataInLocalStorage"));
    if (!users) {
      values.user = "Такого пользователя не существует";
    } else {
      const user = users.find((i) => {
        if (i.email === values.email && i.password === values.password) {
          values.success = true;
          return i;
        } else if (i.email === values.email && i.password !== values.password) {
          return i;
        }
        return false;
      });
      if (!user) {
        values.user = "Такого пользователя не существует";
      } else if (user && !values.success) {
        values.user = "Неверный пароль";
      }
    }
    setSubmitting(false);
  },
  displayName: "Login",
})(Login);

export default LoginContains;
