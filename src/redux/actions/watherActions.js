import { getWather, forecast } from "../../api/api";

export const getWatherInfo = (cityName, id) => (dispatch) => {
  dispatch(setLoaded(true));
  getWather(cityName).then((data) => {
    dispatch(setWatherInfo(data, id));
  });
};

export const getForecast = (cityName) => (dispatch) => {
  dispatch(setLoaded(true));
  forecast(cityName).then((data) => dispatch(setForecast(data)));
};

export const setWatherInfo = (watherCity, id) => ({
  type: "SET_WATHER_INFO",
  payload: watherCity,
  id,
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

export const close = () => ({
  type: "CLOSE_MODAL",
});
