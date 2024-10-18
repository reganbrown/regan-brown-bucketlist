import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import BucketList from "../../components/BucketList/BucketList";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/account");
    }
  }, [navigate]);

  return (
    <div className="container home-page">
      <div className="nav-box">
        <BucketList />
      </div>
    </div>
  );
}
