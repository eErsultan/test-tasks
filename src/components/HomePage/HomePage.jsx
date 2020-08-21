import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import SliderCity from "./SliderCity";
import ModalWindow from "./ModalWindow";

function HomePage(props) {
  return (
    <Fragment>
      <header>
        <div className="city_search">
          <input
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.currentTarget.value)}
            placeholder="Найти город"
          />
          <button onClick={props.sendGetCity}>Найти</button>
          {props.isAuth && (
            <Fragment>
              <Link to="/auth">Войти</Link>
              <div className="error">Войдите в аккаунт</div>
            </Fragment>
          )}
          {props.error !== 200 && (
            <div className="error">По вашему запросу ничего не найдено</div>
          )}
        </div>
      </header>
      <section>
        <div className="slider">
          {props.cities.map((i) => (
            <SliderCity
              key={i.id}
              city={i}
              active={props.dot}
              toggleModal={props.toggleModal}
              watherInfo={props.watherInfo}
            />
          ))}
          <div className="slider__dots">
            {props.cities.map((i) => (
              <span
                key={i.id}
                onClick={() => props.changeSlide(i.id)}
                className={classnames("slider__dots-slide", {
                  active: i.id === props.dot,
                })}
              ></span>
            ))}
          </div>
        </div>
      </section>
      {props.toggleModalWindow && (
        <ModalWindow
          day={props.day}
          chooseDay={props.chooseDay}
          toggleModal={props.toggleModal}
          watherInfo={props.watherInfo}
          forecastFiveDay={props.forecastFiveDay}
          forecastDaily={props.forecastDaily}
        />
      )}
    </Fragment>
  );
}

export default HomePage;
