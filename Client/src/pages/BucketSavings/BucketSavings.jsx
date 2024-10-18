import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BucketSavings() {
  let navigate = useNavigate();
  let { bucketID } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [savings, setSavings] = useState([]);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const getSavings = async () => {
    try {
      let results = await axios.get(
        `${backendUrl}/bucket/${bucketID}/savings`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setSavings(results.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSavings();
  }, [bucketID]);

  return (
    <>
      <h1>Bucket Savings</h1>

      {savings.map((item) => (
        <div key={item.id} className="expense-list">
          <p>{item.saver_name}</p>
          <p>{item.amount}</p>
          <p>{item.date_added}</p>
        </div>
      ))}
    </>
  );
}
