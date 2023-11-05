import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const SignUp = () => {
  //  handle SignUp
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [errorsSignUp, setErrorsSignUp] = useState([]);
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const [formData, setFormData] = useState({
    Gender: "",
    age: "",
    number_smoke_daily: "",
    Price_cigarettes: "",
    emailSignUp: "",
    PasswordSignUp: passwordSignUp,
    date_SignUp: formattedDate,
  });

  const toggleVisibilitySignUp = () => {
    setShowPasswordSignUp(!showPasswordSignUp);
  };

  const handlePasswordChangeSignUp = (e) => {
    const newPassword = e.target.value;
    setErrorsSignUp(newPassword);
    setPasswordSignUp(newPassword);

    const newErrors = [];

    if (!/[A-Z]/.test(newPassword)) {
      newErrors.push("• Capital letter");
    }

    if (!/[a-z]+/.test(newPassword) || !/[0-9]+/.test(newPassword)) {
      newErrors.push("• Letters and numbers");
    }

    if (!/[!@#$%//**--]/.test(newPassword)) {
      newErrors.push("• Symbols!@#$%//**--");
    }

    if (newPassword.length < 10) {
      newErrors.push("• Not less than 10 letters");
    }
    setErrorsSignUp(newErrors);
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      PasswordSignUp: passwordSignUp,
    };

    setFormData(updatedFormData);

    localStorage.setItem("user_data", JSON.stringify(updatedFormData));

    setFormData({
      Gender: "",
      age: "",
      number_smoke_daily: "",
      Price_cigarettes: "",
      emailSignUp: "",
    });
    setPasswordSignUp("");

    const form_form_logup_label = document.querySelector(
      "form#form_logup label"
    );
    form_form_logup_label.click();

    toast.success("successfully registered");
  };

  const handleChangeSignUp = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // END handle SignUp

  return (
    <div className="signup">
      <form method="post" id="form_logup" onSubmit={handleSubmitSignUp}>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>

        <div className="radio_input_Gender">
          <div className="pane">
            <label className="label">
              <span>Man</span>
              <input
                id="left"
                className="input_Gender"
                name="Gender"
                type="radio"
                value="Man"
                onChange={handleChangeSignUp}
                required
              />
            </label>

            <label className="label">
              <span>Woman</span>
              <input
                id="middle"
                className="input_Gender"
                name="Gender"
                type="radio"
                value="Woman"
                onChange={handleChangeSignUp}
              />
            </label>

            <span className="selection"></span>
          </div>
        </div>

        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          value={formData.age}
          onChange={handleChangeSignUp}
        />

        <input
          type="number"
          name="number_smoke_daily"
          placeholder="The number of cigarettes they smoke daily"
          required
          value={formData.number_smoke_daily}
          onChange={handleChangeSignUp}
        />

        <div className="Price_dollar">
          <input
            type="number"
            name="Price_cigarettes"
            placeholder="Price of a pack of cigarettes"
            required
            value={formData.Price_cigarettes}
            onChange={handleChangeSignUp}
          />{" "}
          $
        </div>

        <input
          type="email"
          name="emailSignUp"
          placeholder="Email"
          required
          value={formData.emailSignUp}
          onChange={handleChangeSignUp}
        />

        <div className="conditions_password">
          <input
            type={showPasswordSignUp ? "text" : "password"}
            name="PasswordSignUp"
            placeholder="Password"
            required
            value={passwordSignUp}
            onChange={handlePasswordChangeSignUp}
          />

          <div className="All_Eye" onClick={toggleVisibilitySignUp}>
            {showPasswordSignUp ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>

        {errorsSignUp.length > 0 && (
          <div className="error_password">
            {errorsSignUp.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
          </div>
        )}

        <input
          disabled={errorsSignUp.length > 0}
          className="button"
          type="submit"
          value="Sign up"
        />
      </form>
    </div>
  );
};

export default SignUp;
