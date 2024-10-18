import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
import "./BucketList.scss";

export default function BucketList() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [buckets, setBuckets] = useState([]);
  const token = localStorage.getItem("token");

  const getBucketList = async () => {
    try {
      const results = await axios.get(`${backendUrl}/bucket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBuckets(results.data);
    } catch (error) {
      console.error(
        "Error fetching bucket list:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getBucketList();
  }, [backendUrl, token]);

  return (
    <>
      <Link to={"/account"}>
        <div className="account-button-wrapper">
          <img src={accountLogo} className="account-button coffee-filter" />
        </div>
      </Link>
      <div className="bucket-list">
        {buckets.map((bucket) => (
          <Link to={`/${bucket.id}`} key={bucket.id} className="link">
            <div className="list-item">{bucket.title}</div>
          </Link>
        ))}
      </div>
      <Link to={"/addbucket"}>
        <button type="button" className="add-button">
          +
        </button>
      </Link>
    </>
  );
}
