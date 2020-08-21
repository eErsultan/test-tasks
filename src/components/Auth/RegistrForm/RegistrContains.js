import { withFormik } from "formik";
import Registr from "./Registr";

const RegistrContains = withFormik({
  mapPropsToValues: () => ({
    email: "",
    login: "",
    password: "",
    success: false,
    errorEmail: "",
    errorLogin: "",
  }),
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Введите ваш email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Неверный email адрес";
    }
    if (!values.login) {
      errors.login = "Введите ваш логин";
    } else if (values.login.length < 3) {
      errors.login =
        "Введите логин аккаунта состоящее как минимум из 3 символов";
    } else if (!/^[a-zA-Z1-9]+$/.test(values.login)) {
      errors.login = "В логине должны быть только латинские буквы";
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
    const usersData = JSON.parse(localStorage.getItem("myDataInLocalStorage"));
    let array = [];
    let newUser = {};
    if (usersData) {
      let checkEmail = usersData.find((i) => i.email === values.email);
      let checkLogin = usersData.find((i) => i.login === values.login);
      if (checkEmail) {
        values.errorEmail = "Такой e-mail уже зарегистрирован";
      } else if (checkLogin) {
        values.errorLogin = "Такой логин уже используется";
      } else {
        newUser = {
          email: values.email,
          login: values.login,
          password: values.password,
        };
        array = [...usersData, newUser];
        localStorage.setItem("myDataInLocalStorage", JSON.stringify(array));
        values.success = true;
      }
    } else {
      newUser = {
        email: values.email,
        login: values.login,
        password: values.password,
      };
      array = [newUser];
      localStorage.setItem("myDataInLocalStorage", JSON.stringify(array));
      values.success = true;
    }
    setSubmitting(false);
  },
  displayName: "Registr",
})(Registr);

export default RegistrContains;
