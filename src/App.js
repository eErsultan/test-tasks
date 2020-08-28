import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Login, Registr, HomePageContainer } from "./components";
import { getAllUsersLocStor } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersLocStor());
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Route exact path="/">
          <HomePageContainer />
        </Route>
        <Route exact path="/auth">
          <Login />
        </Route>
        <Route path="/registr" component={Registr} />
      </div>
    </div>
  );
}

export default App;
