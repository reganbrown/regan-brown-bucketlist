import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import accountLogo from "../../assets/account.svg";

export default function SignInForm() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });

      const { token, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      alert(error.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="account-form">
      <Link to={"/account"}>
        <div className="account__button-wrapper">
          <img src={accountLogo} className="account__button Coffee-filter" />
        </div>
      </Link>
      <h1 className="account__header full">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="account__input full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="account__input full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="sign-in__button">
          Sign In
        </button>
      </form>
    </div>
  );
}
