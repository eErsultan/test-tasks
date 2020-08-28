import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux";

import { setUserr } from "../../../redux/actions/citiesActions";

function Login(props) {
  const dispatch = useDispatch();

  const setEmail = () => {
    dispatch(setUserr(props.values.email));
  };

  if (props.values.success) return <Redirect to="/" />;

  return (
    <div className="login-block">
      <h1>Войти в аккаунт</h1>
      <Form className="login-block__form" action="POST">
        <div className="login">
          <div className="login__email">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" className="error" component="div" />
          </div>
          <div className="login__password">
            <Field type="password" name="password" placeholder="Пароль" />
            <ErrorMessage name="password" className="error" component="div" />
          </div>
        </div>
        <div className="error">{props.values.user}</div>
        <div className="btn">
          <button type="submit" onClick={setEmail}>
            ВОЙТИ В АККАУНТ
          </button>
          <Link to="/registr">Зарегистрироваться</Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
