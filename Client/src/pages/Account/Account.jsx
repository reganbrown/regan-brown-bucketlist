import "./Account.scss";
import SignInForm from "../../components/SignInForm/SignInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignOutForm from "../../components/SignOutForm/SignOutForm";
import { useState, useEffect } from "react";

export default function Account() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="container account-page">
      <div className="nav-box">
        {token ? (
          <>
            <SignOutForm onLogout={handleLogout} />
          </>
        ) : (
          <>
            {isSignIn ? (
              <SignInForm onToggle={toggleForm} />
            ) : (
              <SignUpForm onToggle={toggleForm} />
            )}
            <div onClick={toggleForm} className="sign-in-toggle">
              {isSignIn
                ? "...or click here to Sign Up"
                : "...or click here to Sign In"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
