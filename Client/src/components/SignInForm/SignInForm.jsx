import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
import "./SignInForm.scss";

export default function BucketList() {
  return (
    <div className="sign-in-form">
      <Link to={"/account"}>
        <div className="account-button-wrapper">
          <img src={accountLogo} className="account-button coffee-filter" />
        </div>
      </Link>
      <div className="full">Sign In</div>
      <form>
        <label className="full">
          Email:{" "}
          <input
            type="email"
            placeholder="enter valid email"
            className="full"
          />
        </label>
        <label className="full">
          Password:
          <input
            type="password"
            placeholder="enter your password"
            className="full"
          />
        </label>
        <button type="submit">Sign In</button>
        <button type="button">Sign Up</button>
      </form>
    </div>
  );
}
