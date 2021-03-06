import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Field, ErrorMessage, Form } from "formik";

function Registr(props) {
  return (
    <div className="login-block">
      <h1>Регистрация</h1>
      <Form
        action="POST"
        className="login-block__form"
        style={{ textAlign: "center" }}
      >
        {!props.values.success ? (
          <Fragment>
            <div className="login">
              <div className="login__email">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" className="error" component="div" />
                <div className="error">{props.values.errorEmail}</div>
              </div>
              <div className="login__name">
                <Field type="text" name="login" placeholder="Логин" />
                <ErrorMessage name="login" className="error" component="div" />
                <div className="error">{props.values.errorLogin}</div>
              </div>
              <div className="login__password">
                <Field type="password" name="password" placeholder="Пароль" />
                <ErrorMessage
                  name="password"
                  className="error"
                  component="div"
                />
              </div>
            </div>
            <div className="btn">
              <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
              <Link to="/auth">Войти в аккаунт</Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <i className="i">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="55"
                height="61"
                viewBox="0 0 55 61"
                fill="none"
              >
                <rect width="55" height="61" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0"
                      transform="scale(0.0125 0.0113636)"
                    />
                  </pattern>
                  <image
                    id="image0"
                    width="80"
                    height="88"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </i>
            <h2>Ваш аккаунт успешно создан!</h2>
            <Link to="/auth" className="to-return">
              Войти в аккаунт
            </Link>
          </Fragment>
        )}
      </Form>
    </div>
  );
}

export default Registr;
