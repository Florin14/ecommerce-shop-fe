import React from "react";
import "./Login.css";
import { styled } from "@mui/material";
import logo from "../../../assets/logo (1).png"
import google from "../../../assets/google.png"
import apple from "../../../assets/apple.png"
import mock from "../../../assets/mock.png"

interface SignUpProps {}

const Login: React.FC<SignUpProps> = () => {
  return (
    <FormWrapper>
      <div className="form-side">
        <a href="#" title="Logo">
          <img className="logo" src={logo} alt="Logo" />
        </a>
        <form className="my-form">
          <div className="login-welcome-row">
            <h1>Create your account &#x1F44F;</h1>
          </div>
          <div className="socials-row">
            <a href="#" title="Use Google">
              <img src={google} alt="Google" />
              Sign up with Google
            </a>
            <a href="#" title="Use Apple">
              <img src={apple} alt="Apple" />
              Sign up with Apple
            </a>
          </div>
          <div className="divider">
            <span className="divider-line"></span>
            Or
            <span className="divider-line"></span>
          </div>
          <div className="text-field">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Your Email"
                required
              />
              {/* svg icon */}
            </label>
          </div>
          <div className="text-field">
            <label htmlFor="password">
              Password:
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Your Password"
                title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                required
              />
              {/* svg icon */}
            </label>
          </div>
          <div className="text-field">
            <label htmlFor="confirm-password">
              Repeat Password:
              <input
                id="confirm-password"
                type="password"
                name="password"
                placeholder="Repeat Password"
                title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                required
              />
              {/* svg icon */}
            </label>
          </div>
          <button className="my-form__button" type="submit">
            Sign up
          </button>
          <div className="my-form__actions">
            <div className="my-form__row">
              <span>Did you forget your password?</span>
              <a href="#" title="Reset Password">
                Reset Password
              </a>
            </div>
            <div className="my-form__signup">
              <a href="#" title="Login">
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
      <div className="info-side">
        <img src={mock} alt="Mock" className="mockup" />
        <div className="welcome-message">
          <h2>Navitron Maps! 👋</h2>
          <p>
            Your ultimate guide to navigating the world and discovering new
            places with ease.
          </p>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Login;

const FormWrapper = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: 4fr 3fr;
  margin: 0 auto;
`;
