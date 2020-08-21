import React from "react";
import classnames from "classnames";

function SliderCity({ city, active, toggleModal, watherInfo }) {
  return (
    <div
      onClick={toggleModal}
      className={classnames("slider__cities", {
        active: city.id === active,
      })}
      style={
        city.src
          ? { backgroundImage: `url(${city.src})` }
          : { background: "linear-gradient(36deg, #2b0fff, #14c6ff)" }
      }
    >
      <div className="slider__cities-name">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="map-marker-alt"
            role="img"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
            />
          </svg>
        </i>
        <span>{watherInfo ? watherInfo.name : city.name}</span>
      </div>
      <div className="slider__cities-current_info">
        <div className="slider__cities-current_info-drugger">
          {Object.keys(watherInfo).length &&
            Math.round(watherInfo.main.temp - 273)}
          °
        </div>
        <div className="slider__cities-current_info-weather">
          {Object.keys(watherInfo).length && watherInfo.weather[0].main}
        </div>
      </div>
    </div>
  );
}

export default SliderCity;
