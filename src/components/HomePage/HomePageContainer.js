import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";

import {
  getWatherInfo,
  getForecast,
  getWatherFullDay,
  close,
} from "../../redux/actions/watherActions";
import { addNewCity } from "../../redux/actions/citiesActions";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

import HomePage from "./HomePage";

function HomePageContainer(props) {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [day, setDay] = useState(0);

  const { citiess, error } = useSelector(({ cities }) => cities);
  const {
    watherInfo,
    forecastFiveDay,
    forecastDaily,
    toggleModalWindow,
    dot,
  } = useSelector(({ wather }) => wather);

  useEffect(() => {
    dispatch(getWatherInfo("Moscow", 1));
  }, []);

  const onChange = (value) => {
    setValue(value);
  };

  const changeSlide = (id) => {
    dispatch(getWatherInfo(citiess[id - 1].name, id));
  };

  const toggleModal = (cityName) => {
    dispatch(getForecast(cityName));
  };

  const closeModal = () => {
    dispatch(close());
  };

  const chooseDay = (index, date) => {
    setDay(index);
    dispatch(getWatherFullDay(date));
  };

  const addCity = () => {
    dispatch(addNewCity(value, citiess.length + 1));
  };

  return (
    <HomePage
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
      closeModal={closeModal}
      addCity={addCity}
    />
  );
}

let mapStateToProps = (state) => ({
  email: state.cities.email,
});

let withAuthComponent = withAuthRedirect(HomePageContainer);

export default connect(mapStateToProps)(withAuthComponent);
