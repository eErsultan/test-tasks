import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { Login, Registr, HomePageContainer } from "./components";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [user, setUser] = useState([null]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("myDataInLocalStorage"));
    setUser(users);
  }, []);

  const getUserEmail = (email) => {
    setUserEmail(email);
  };

  return (
    <div className="App">
      <div className="container">
        <Route exact path="/">
          <HomePageContainer user={user} userEmail={userEmail} />
        </Route>
        <Route exact path="/auth">
          <Login getUserEmail={getUserEmail} />
        </Route>
        <Route path="/registr" component={Registr} />
      </div>
    </div>
  );
}

export default App;
