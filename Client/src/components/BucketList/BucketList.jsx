import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
import "./BucketList.scss";

export default function BucketList() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [buckets, setBuckets] = useState([]);

  const getBucketList = async () => {
    let results = await axios.get(`${backendUrl}/bucket/`);
    setBuckets(results.data);
  };

  useEffect(() => {
    getBucketList();
  }, []);

  if (!buckets) {
    return <h1>loading...</h1>;
  }
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
