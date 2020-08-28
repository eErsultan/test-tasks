export const getAllUsersLocStor = () => (dispatch) => {
  let allUsers = JSON.parse(localStorage.getItem("myDataInLocalStorage"));
  dispatch(getAllUsers(allUsers));
};

const getAllUsers = (allUsers) => ({
  type: "GET_ALL_USERS",
  payload: allUsers,
});
