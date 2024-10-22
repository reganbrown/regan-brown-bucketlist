import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInForm() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Logged In Successfully! Redirecting...", {
      onClose: () => navigate("/"),
    });
  const notifyError = (errorMessage) => toast.error(errorMessage);

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

      notifySuccess();
    } catch (error) {
      notifyError(error.response?.data.message || "Login failed");
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
      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}
