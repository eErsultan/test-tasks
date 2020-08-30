const initialState = {
  watherInfo: {},
  forecast: {},
  forecastFiveDay: [],
  forecastDaily: [],
  isLoaded: false,
  toggleModalWindow: false,
  dot: 1,
};

const watherInfo = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_WATHER_INFO":
      return {
        ...state,
        watherInfo: actions.payload,
        isLoaded: false,
        dot: actions.id,
      };
    case "SET_FORECAST":
      let forecastFiveDay = actions.payload.list.filter(
        (i) => i.dt_txt.split(" ")[1] === "15:00:00"
      );
      let forecastDaily = actions.payload.list.filter(
        (i) =>
          i.dt_txt.split(" ")[0] ===
          actions.payload.list[0].dt_txt.split(" ")[0]
      );
      return {
        ...state,
        forecast: actions.payload.list,
        forecastFiveDay,
        forecastDaily,
        toggleModalWindow: true,
        isLoaded: false,
      };
    case "GET_WATHER_FULL_DAY": {
      let forecastDaily = state.forecast.filter(
        (i) => i.dt_txt.split(" ")[0] === actions.payload
      );
      return {
        ...state,
        forecastDaily,
      };
    }
    case "SET_LOADED":
      return {
        ...state,
        isLoaded: actions.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        toggleModalWindow: false,
      };
    default:
      return state;
  }
};

export default watherInfo;
