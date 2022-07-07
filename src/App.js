import "./App.css";
import React from "react";
// import ReactDOM from "react-dom";
import Login from "./views/login/Login";
import SignUp from "./views/Sign_Up/SignUp";
import Dashboard from "./views/Dashboard/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Student_signup from "./modules/Students/auth/Student_signup";
// import Resetpw from "./modules/Students/auth/Resetpw";
// import Student_profile from "./modules/Students/Components/Profile/Student_profile";
import Confirmationscreen from "./modules/Students/auth/confirmationscreen";
// import { useEffect } from "react";
import LandingPage from "./views/Landing Page/index";
import { ViewPdf } from "./modules/Admin/Components/CustomTable/viewPdf";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route component={LandingPage} exact path="/" />
          <Route component={Login} path="/login" />
          <Route component={Dashboard} path="/dashboard" />
          <Route component={SignUp} path="/signup" />
          <Route component={Student_signup} path="/student/signup" />
          <Route component={Confirmationscreen} path="/confirmation" />
          <Route component={ViewPdf} path="/pdf:slug"/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
