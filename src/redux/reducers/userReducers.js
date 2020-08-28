const initialState = {
  allUsers: [],
};

const getAllUsers = (state = initialState, actions) => {
  switch (actions.type) {
    case "GET_ALL_USERS":
      return {
        allUsers: actions.payload,
      };

    default:
      return state;
  }
};

export default getAllUsers;
