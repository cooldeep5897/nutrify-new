import React from 'react';
import { NavLink } from 'react-router-dom';
const HomePage = () => {
  return <React.Fragment>
        <div className="user">
        <header className="user__header"> <h1 class="user__title">*****Home Page*****</h1></header>
            <br></br>
            <form className="form">
            <div className="form__group">
            <NavLink to="/Signup"  >
                <button className="btn" type="button">Sign Up</button>
            </NavLink>
            </div>
            </form>
            <form className="form">
            <div className="form__group">
            <NavLink to="/login" activeClassName="active">
                <button className="btn" type="button" >Log In</button>
            </NavLink></div>
            </form>
        </div>
        </React.Fragment>;
};

export default HomePage;