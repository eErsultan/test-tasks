import axios from "axios";

export const getWather = (cityName) => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e75f12938219a9653433055c7a9cb54a`
    )
    .then((res) => res.data);
};

export const forecast = (cityName) => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e75f12938219a9653433055c7a9cb54a`
    )
    .then((res) => res.data);
};

export const newCity = (newCityName) => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=e75f12938219a9653433055c7a9cb54a`
    )
    .then((res) => res)
    .catch((error) => error.response.status);
};
