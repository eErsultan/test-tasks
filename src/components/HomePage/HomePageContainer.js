import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getWatherInfo,
  getForecast,
  getWatherFullDay,
} from "../../redux/actions/watherActions";
import { addNewCity } from "../../redux/actions/citiesActions";

import HomePage from "./HomePage";

function HomePageContainer() {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [dot, setDot] = useState(1);
  const [day, setDay] = useState(0);
  const [toggleModalWindow, setToggleModalWindow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const { allUsers } = useSelector(({ users }) => users);
  const { citiess, email, error } = useSelector(({ cities }) => cities);
  const { watherInfo, forecastFiveDay, forecastDaily } = useSelector(
    ({ wather }) => wather
  );

  useEffect(() => {
    dispatch(getWatherInfo("Moscow"));
  }, []);

  const onChange = (value) => {
    setValue(value);
  };

  const changeSlide = (id) => {
    setDot(id);
    dispatch(getWatherInfo(citiess[id - 1].name));
  };

  const toggleModal = (cityName) => {
    setToggleModalWindow(!toggleModalWindow);
    if (!toggleModalWindow) {
      dispatch(getForecast(cityName));
    }
  };

  const chooseDay = (index, date) => {
    setDay(index);
    dispatch(getWatherFullDay(date));
  };

  const addCity = () => {
    if (!email) {
      setIsAuth(true);
      return;
    }
    dispatch(addNewCity(value));
    setDot(citiess.length + 1);
    toggleModal(watherInfo.name);
  };

  if (allUsers.length < 0) {
    return <Redirect to="/auth" />;
  }

  return (
    <HomePage
      isAuth={isAuth}
      cities={citiess}
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
      addCity={addCity}
    />
  );
}

export default HomePageContainer;
