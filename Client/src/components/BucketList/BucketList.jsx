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
        <div className="account__button-wrapper">
          <img src={accountLogo} className="account__button Coffee-filter" />
        </div>
      </Link>
      <h3 className="branded-title">This Little Bucket</h3>
      <div className="bucket-list">
        <div
          className={buckets.length === 0 ? "no-buckets" : "no-buckets-hidden"}
        >
          No buckets to display!
        </div>
        {buckets.map((bucket) => (
          <Link to={`/${bucket.id}`} key={bucket.id} className="link">
            <div className="list-item">{bucket.title}</div>
          </Link>
        ))}
      </div>
      <div
        className={buckets.length === 0 ? "no-buckets" : "no-buckets-hidden"}
      >
        Click this plus button to get started!
      </div>
      <Link to={"/addbucket"}>
        <button type="button" className="bucket__add-button">
          +
        </button>
      </Link>
    </>
  );
}
