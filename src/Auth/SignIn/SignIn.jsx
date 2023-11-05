import React, { useState } from "react";
import "../signIn.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../ConditionAuth";
import SignUp from "./SignUp";

const SignIn = () => {
  const Auth = useAuth();
  const navigate = useNavigate();

  const loginData = localStorage.getItem("login");

  // handle Login
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const toggleVisibilityLogin = () => {
    setShowPasswordLogin(!showPasswordLogin);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user_data")) || {};

    if (
      emailLogin === userData.emailSignUp &&
      passwordLogin === userData.PasswordSignUp
    ) {
      toast.success("You have been logged in successfully.");

      localStorage.setItem("login", true);

      if (loginData === "true") {
        Auth.logIn(loginData);
      }

      navigate("/profile", { replace: true });
    } else {
      toast.error("Incorrect email or password.");

      localStorage.setItem("login", false);

      if (loginData === "false") {
        Auth.logOut(null);
      }
    }
  };
  // END handle Login



  return (
    <div className="signup_div">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form method="post" id="form_login" onSubmit={handleSubmitLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmailLogin(e.target.value)}
            />

            <div className="conditions_password">
              <input
                type={showPasswordLogin ? "text" : "password"}
                name="pswd"
                placeholder="Password"
                onChange={(e) => setPasswordLogin(e.target.value)}
                required
              />

              <div className="All_Eye" onClick={toggleVisibilityLogin}>
                {showPasswordLogin ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>

            <input className="button" type="submit" value="Login" />
          </form>
        </div>

        <SignUp />
      </div>
    </div>
  );
};

export default SignIn;
