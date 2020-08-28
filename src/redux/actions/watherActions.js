import axios from "axios";

export const getWatherInfo = (cityName) => (dispatch) => {
  dispatch(setLoaded(true));
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e75f12938219a9653433055c7a9cb54a`
    )
    .then((res) => {
      dispatch(setWatherInfo(res.data));
    });
};

export const getForecast = (cityName) => (dispatch) => {
  dispatch(setLoaded(true));
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e75f12938219a9653433055c7a9cb54a`
    )
    .then((res) => dispatch(setForecast(res.data)));
};

export const setWatherInfo = (watherCity) => ({
  type: "SET_WATHER_INFO",
  payload: watherCity,
});

export const setForecast = (watherCity) => ({
  type: "SET_FORECAST",
  payload: watherCity,
});

export const getWatherFullDay = (date) => ({
  type: "GET_WATHER_FULL_DAY",
  payload: date,
});

const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});
