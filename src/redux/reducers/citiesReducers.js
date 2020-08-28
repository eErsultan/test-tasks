// import Moscow from "../../assets/img/Moscow.jpg";
// import Paris from "../../assets/img/Paris.jpg";
// import London from "../../assets/img/London.jpg";
// import NewYork from "../../assets/img/New-york.jpg";
// import Beijing from "../../assets/img/Beijing.jpg";

let cities = [
  { id: 1, name: "Москва", src: null },
  { id: 2, name: "Париж", src: null },
  { id: 3, name: "Лондон", src: null },
  { id: 4, name: "Нью-Йорк", src: null },
  { id: 5, name: "Пекин", src: null },
];

const initialState = {
  email: "",
  citiess: [],
  error: null,
};

const userCities = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_USER_SITIES":
      let newCities = JSON.parse(localStorage.getItem("userCities"));
      if (newCities) {
        newCities = newCities.find((i) => i.email === actions.payload);
        return {
          citiess: newCities.cities,
          email: actions.payload,
        };
      } else {
        return {
          citiess: cities,
          email: actions.payload,
        };
      }
    case "REQ_SUCCESSFUL": {
      let newCity = {
        id: state.citiess.length + 1,
        name: actions.payload.name,
        src: null,
      };
      let cities = [...state.citiess, newCity];
      let userCities = { email: state.email, cities };
      let allUserCities = JSON.parse(localStorage.getItem("userCities"));

      if (allUserCities) {
        let user = allUserCities.findIndex((i) => i.email === state.email);
        if (user >= 0) {
          allUserCities[user] = userCities;
          localStorage.setItem("userCities", JSON.stringify(allUserCities));
        } else {
          allUserCities = [...allUserCities, userCities];
          localStorage.setItem("userCities", JSON.stringify(allUserCities));
        }
      } else {
        allUserCities = [userCities];
        localStorage.setItem("userCities", JSON.stringify(allUserCities));
      }

      return {
        ...state,
        citiess: [...state.citiess, newCity],
        error: 200,
      };
    }
    case "REQ_ERROR":
      return {
        ...state,
        error: actions.payload,
      };
    default:
      return state;
  }
};

export default userCities;
