import { newCity } from "../../api/api";
import { getWatherInfo, getForecast } from "./watherActions";

export const setUserr = (email) => ({
  type: "SET_USER_SITIES",
  payload: email,
});

export const addNewCity = (newCityName, id) => (dispatch) => {
  newCity(newCityName).then((res) => {
    if (res === 404) {
      dispatch(requestError(res));
    } else {
      dispatch(requestSuccessful(res.data));
      dispatch(getWatherInfo(newCityName, id));
      dispatch(getForecast(newCityName));
    }
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
