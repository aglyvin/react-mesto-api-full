import logo from "../images/Vector.svg";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import React, { useEffect } from "react";


function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo"></img> 
      <Switch>
        <Route exact path="/login">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/signup">
          <Link to="/login" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
            <p className="header__email">{props.email}</p>
            <Link to='/login' className="header__link" onClick={props.onSignOut}>Выйти</Link>
          </div>          
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
