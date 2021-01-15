// base
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.scss';
// other
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// pages
import NewsPage from "./components/NewsPage/NewsPage";
import SignupPage from "./components/SignupPage/SignupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UpdateProfilePage from "./components/UpdateProfile/UpdateProfilePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import Header from "./components/Header/Header";
import VideoChatPage from "./components/VideoChatPage/VideoChatPage";
import Users from "./components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header/>
        <Users/>
        <Switch>
          <PrivateRoute exact path={'/'} component={NewsPage}/>
          <PrivateRoute path={'/update-profile'} component={UpdateProfilePage}/>
          <PrivateRoute path={'/video'} component={VideoChatPage}/>
          <Route path={'/signup'} component={SignupPage}/>
          <Route path={'/login'} component={LoginPage}/>
          <Route path={'/forgot-password'} component={ForgotPasswordPage}/>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
