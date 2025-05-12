import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("Yogesh@gmail.com");
  const [password, setPassword] = useState("Yogesh@123");
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

  return (
    <div className="card card-dash bg-base-300 w-96 flex items-center  mx-auto my-10">
      <div className="card-body w-full">
        <h2 className="card-title my-0 mx-auto">Login</h2>
        <div className="card-actions gap-0">
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
          <p className="text-red-500">{error}</p>
          <button
            className="btn btn-primary mx-auto mt-4"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
