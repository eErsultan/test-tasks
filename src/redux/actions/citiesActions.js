import axios from "axios";

import { getWatherInfo, getForecast } from "./watherActions";

export const setUserr = (email) => ({
  type: "SET_USER_SITIES",
  payload: email,
});

export const addNewCity = (newCityName) => (dispatch) => {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=e75f12938219a9653433055c7a9cb54a`
    )
    .then((res) => {
      dispatch(requestSuccessful(res.data));
      dispatch(getWatherInfo(newCityName));
      dispatch(getForecast(newCityName));
    })
    .catch((err) => {
      dispatch(requestError(err.response.status));
    });
};

const requestSuccessful = (data) => ({
  type: "REQ_SUCCESSFUL",
  payload: data,
});

const requestError = (status) => ({
  type: "REQ_ERROR",
  payload: status,
});
