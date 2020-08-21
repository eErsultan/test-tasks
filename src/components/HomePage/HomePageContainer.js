import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Moscow from "../../assets/img/Moscow.jpg";
import Paris from "../../assets/img/Paris.jpg";
import London from "../../assets/img/London.jpg";
import NewYork from "../../assets/img/New-york.jpg";
import Beijing from "../../assets/img/Beijing.jpg";
import HomePage from "./HomePage";

let cities = [
  { id: 1, name: "Москва", src: Moscow },
  { id: 2, name: "Париж", src: Paris },
  { id: 3, name: "Лондон", src: London },
  { id: 4, name: "Нью-Йорк", src: NewYork },
  { id: 5, name: "Пекин", src: Beijing },
];

function HomePageContainer(props) {
  const [userEmail, setUserEmail] = useState(null);
  const [value, setValue] = useState("");
  const [dot, setDot] = useState(cities[0].id);
  const [day, setDay] = useState(0);
  const [toggleModalWindow, setToggleModalWindow] = useState(false);
  const [cityName, setCityName] = useState(cities[0].name);
  const [newCityName, setNewCityName] = useState(null);
  const [watherInfo, setWatherInfo] = useState({});
  const [forecast, setForecast] = useState({});
  const [forecastFiveDay, setForecastFiveDay] = useState([]);
  const [forecastDaily, setForecastDaily] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.userEmail) {
      let newCities = JSON.parse(localStorage.getItem("userCities"));
      if (newCities) {
        newCities = newCities.find((i) => {
          if (i.email === props.userEmail) {
            return i;
          }
          return false;
        });
        if (newCities) {
          cities = newCities.cities;
        }
      }
      setUserEmail(props.userEmail);
    }
  }, []);

  const onChange = (value) => {
    setValue(value);
  };

  const changeSlide = (id) => {
    setDot(id);
    setCityName(cities[id - 1].name);
  };

  const chooseDay = (index, date) => {
    setDay(index);
    let newArray = forecast.list.filter((i) => i.dt_txt.split(" ")[0] === date);
    setForecastDaily(newArray);
  };

  const toggleModal = () => {
    setToggleModalWindow(!toggleModalWindow);
    if (!toggleModalWindow) {
      let newArray = forecast.list.filter(
        (i) => i.dt_txt.split(" ")[1] === "15:00:00"
      );
      let newArr = forecast.list.filter(
        (i) => i.dt_txt.split(" ")[0] === forecast.list[0].dt_txt.split(" ")[0]
      );
      setForecastDaily(newArr);
      setForecastFiveDay(newArray);
    }
  };

  const sendGetCity = () => {
    if (!userEmail) {
      setIsAuth(true);
      return;
    }
    setNewCityName(value);
  };

  const addCity = () => {
    let newCity = { id: cities.length + 1, name: value, src: null };
    cities = [...cities, newCity];
    setDot(newCity.id);
    toggleModal();
    let userCities = { email: userEmail, cities };
    let allUserCities = JSON.parse(localStorage.getItem("userCities"));

    if (allUserCities) {
      let user = allUserCities.findIndex((i) => i.email === userEmail);
      if (user >= 0) {
        allUserCities[user] = userCities;
        return localStorage.setItem(
          "userCities",
          JSON.stringify(allUserCities)
        );
      } else {
        allUserCities = [...allUserCities, userCities];
        localStorage.setItem("userCities", JSON.stringify(allUserCities));
      }
    } else {
      allUserCities = [userCities];
      localStorage.setItem("userCities", JSON.stringify(allUserCities));
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e75f12938219a9653433055c7a9cb54a`
      )
      .then((res) => {
        setError(200);
        setWatherInfo(res.data);
      });
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e75f12938219a9653433055c7a9cb54a`
      )
      .then((res) => setForecast(res.data));
  }, [cityName]);

  useEffect(() => {
    if (newCityName) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=e75f12938219a9653433055c7a9cb54a`
        )
        .then((res) => {
          setError(200);
          setWatherInfo(res.data);
          addCity();
        })
        .catch((err) => {
          setError(err.response.data.cod);
        });
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${newCityName}&appid=e75f12938219a9653433055c7a9cb54a`
        )
        .then((res) => setForecast(res.data))
        .catch((err) => err);
    }
  }, [newCityName]);

  if (!props.user) {
    return <Redirect to="/registr" />;
  }

  return (
    <HomePage
      isAuth={isAuth}
      cities={cities}
      value={value}
      dot={dot}
      day={day}
      error={error}
      toggleModalWindow={toggleModalWindow}
      watherInfo={watherInfo}
      forecastFiveDay={forecastFiveDay}
      forecastDaily={forecastDaily}
      onChange={onChange}
      changeSlide={changeSlide}
      chooseDay={chooseDay}
      toggleModal={toggleModal}
      sendGetCity={sendGetCity}
    />
  );
}

export default HomePageContainer;
