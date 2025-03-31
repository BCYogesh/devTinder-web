import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {};

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
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button
            className="btn btn-primary mx-auto mt-4"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
