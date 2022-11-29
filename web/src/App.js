import "./App.css";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Profile from "./pages/profile";
import NavBar from "./components/Navbar";
import Recipe from "./components/recipe";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from "./context";
import axios from "axios";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      let baseUrl = "http://localhost:5001";
      try {
        let response = await axios({
          url: `${baseUrl}/profile`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response: ", response.data);
          dispatch({
            type: "USER_LOGIN",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "USER_LOGOUT",
          });
        }
      } catch (e) {
        console.log("Error in api call: ", e);
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    getProfile();
  }, []);
  return (
    <Router>
      <NavBar />
      <Routes>
        {state.isLogin === true ? (
          <>
            <Route path="/" element={<Profile />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : null}
        {state.isLogin === false ? (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : null}
        {state.isLogin === null ? <>Loading...</> : null}
        {/* <Route path="/" element={<Profile />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
