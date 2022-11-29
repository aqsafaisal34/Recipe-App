import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import axios from "axios";

function Navbar() {
  let { state, dispatch } = useContext(GlobalContext);

  const logoutHandler = async () => {
    let baseUrl = "http://localhost:5001";
    try {
      let response = await axios.post(
        `${baseUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("response: ", response.data);

      dispatch({ type: "USER_LOGOUT" });
    } catch (e) {
      console.log("Error in api call: ", e);
    }
  };
  return (
    <div className="navbar">
      <div className="userName">
       
        <h1>
          {state?.user?.firstName}
          {state?.user?.lastName}
        </h1>
      </div>
      {state.isLogin === true ? (
        <ul>
          <li>
            {" "}
            <Link to="/">Profile</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/login">SignIn</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/signup">SignUp</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/login" onClick={logoutHandler}>
              Logout
            </Link>{" "}
          </li>
        </ul>
      ) : null}
      {state.isLogin === false ? (
        <ul>
          <li>
            {" "}
            <Link to="/login">SignIn</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/signup">SignUp</Link>{" "}
          </li>
        </ul>
      ) : null}
      {/* <ul>
          <li><Link to="/">Profile</Link></li>
          <li><Link to="/login">SignIn</Link> </li>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/login" onClick={logoutHandler}>Logout</Link></li>
      </ul> */}
    </div>
  );
}

export default Navbar;
