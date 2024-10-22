import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrowBack from "../../assets/arrow-back.svg";

export default function SignOutForm({ onLogout }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    onLogout();
    navigate("/account");
  };

  const getAccount = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/userDetails`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { name } = response.data;
      setName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/account");
    } else {
      getAccount();
    }
  }, [navigate]);

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/user/deleteAccount`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      onLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-form logout">
      <Link to={`/`}>
        <img src={arrowBack} className="logo Coffee-filter" />
      </Link>
      <h1 className="account__header">Welcome</h1>
      <h2 className="account__header">{name}</h2>
      <button onClick={logout} className="sign-in__button">
        Logout
      </button>
      <div className="delete-account" onClick={deleteAccount}>
        Or click here to delete your account permanently...
      </div>
    </div>
  );
}
