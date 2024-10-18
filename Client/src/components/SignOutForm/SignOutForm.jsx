import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrowBack from "../../assets/arrow-back.svg";

export default function SignOutForm({ onLogout }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    onLogout(); // Call the logout handler passed from Account
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
      navigate("/login");
    } else {
      getAccount();
    }
  }, [navigate]);

  return (
    <div className="account-form logout">
      <Link to={`/`}>
        <img src={arrowBack} className="logo coffee-filter" />
      </Link>
      <h1 className="account-header">Welcome</h1>
      <h2 className="account-header">{name}</h2>
      <button onClick={logout} className="add-button">
        Logout
      </button>
    </div>
  );
}
