import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInForm() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Account Created! Redirecting...", {
      onClose: () => navigate("/"),
    });
  const notifyError = (errorMessage) => toast.error(errorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/user/signup`, {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      const { token, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      notifySuccess();
    } catch (error) {
      notifyError(error.response?.data.message || "Sign Up failed");
    }
  };

  return (
    <div className="account-form">
      <Link to={"/account"}>
        <div className="account__button-wrapper">
          <img src={accountLogo} className="account__button Coffee-filter" />
        </div>
      </Link>
      <h1 className="full account__header">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="full account__input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="full account__input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="full account__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="full account__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="sign-in__button">
          Sign Up
        </button>
      </form>
      <ToastContainer limit={3} />
    </div>
  );
}
