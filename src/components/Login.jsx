import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
      console.log(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
    }
  };

  const handlePage = () => {
    setIsLoginForm((state) => !state);
    setError(false);
  };

  return (
    <div className="card card-dash bg-base-300 w-96 flex items-center  mx-auto my-10">
      <div className="card-body w-full">
        <h2 className="card-title my-0 mx-auto">
          {isLoginForm ? "Login" : "Signup"}
        </h2>
        <div className="card-actions gap-0">
          {!isLoginForm && (
            <>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <span className="text-red-500 w-full">{error}</span>
          <button
            className="btn btn-primary mt-4 mx-auto"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </div>
      </div>
      <p className="mx-auto cursor-pointer py-2" onClick={handlePage}>
        {isLoginForm ? (
          <>
            Or signup using? <span className="text-blue-300">Signup</span>
          </>
        ) : (
          <>
            Existing user? <span className="text-blue-300">Login</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;
