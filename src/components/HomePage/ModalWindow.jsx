import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Loader from "./Loader";

function ModalWindow({
  day,
  chooseDay,
  closeModal,
  watherInfo,
  forecastFiveDay,
  forecastDaily,
}) {
  const { isLoaded } = useSelector(({ wather }) => wather);
  return (
    <Fragment>
      {isLoaded ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="modal-window">
            <div className="modal-window__info">
              <div className="modal-window__info-full_wather">
                <div className="modal-window__current_temp">
                  {Math.round(watherInfo.main.temp - 273)}°
                </div>
                <div className="modal-window__wather-info">
                  <span>{watherInfo.weather[0].description}</span>
                  <ul>
                    <li>
                      По ощущениям {Math.round(watherInfo.main.temp - 273)}°
                    </li>
                    <li>Ветер {watherInfo.wind.speed} м/с</li>
                    <li>Давление {watherInfo.main.pressure} гПа</li>
                    <li>
                      Видимость {Math.round(watherInfo.visibility / 1000)} км
                    </li>
                    <li>Влажность {watherInfo.main.humidity}%</li>
                    <li>Облачность {watherInfo.clouds.all}%</li>
                  </ul>
                </div>
              </div>
              <ul className="modal-window__info__forecast-list">
                {forecastFiveDay.map((i, index) => (
                  <li
                    key={i.dt}
                    onClick={() => chooseDay(index, i.dt_txt.split(" ")[0])}
                    className={day === index ? "active" : null}
                  >
                    <div className="date">{`${
                      i.dt_txt.split(" ")[0].split("-")[2]
                    }.${i.dt_txt.split(" ")[0].split("-")[1]}`}</div>
                    <div className="temp">
                      <div className="temp_info">
                        <div className="temp_info-max">
                          {Math.round(i.main.temp_max - 273)}°
                        </div>
                        <div className="temp_info-min">
                          {Math.round(i.main.temp_min - 273)}°
                        </div>
                      </div>
                      <img
                        src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                        alt="icon wather"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="modal-window__info__hrdetails">
                {forecastDaily.map((i) => (
                  <li key={i.dt}>
                    <div className="time">{`${
                      i.dt_txt.split(" ")[1].split(":")[0]
                    }:${i.dt_txt.split(" ")[1].split(":")[1]}`}</div>
                    <img
                      src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                      alt="icon wather"
                    />
                    <div className="skytext">{i.weather[0].description}</div>
                    <div className="temp_info">
                      {Math.round(i.main.temp - 273)}°
                    </div>
                  </li>
                ))}
              </ul>

              <div className="back" onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  role="img"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ModalWindow;
