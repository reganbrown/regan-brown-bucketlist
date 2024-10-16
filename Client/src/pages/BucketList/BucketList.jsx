import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import "./BucketList.scss";

export default function BucketList() {
  const [buckets, setBuckets] = useState([]);

  const getBucketList = async () => {
    let results = await axios.get("http://localhost:8080/bucket/");
    setBuckets(results.data);
  };

  useEffect(() => {
    getBucketList();
  }, []);

  if (!buckets) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="container coffee-page">
      <div className="header">
        <Link to={`/`}>
          <img src={arrowBack} className="logo coffee-filter" />
        </Link>
        <Link to={`/`}>
          <img src={bucketLogo} className="logo coffee-filter" />
        </Link>
        <img src={accountLogo} className="logo coffee-filter" />
      </div>
      <div className="bucket-title">Bucket List</div>
      <div className="bucket-list">
        {buckets.map((bucket) => (
          <Link
            to={`/bucketlist/${bucket.id}`}
            key={bucket.id}
            className="link"
          >
            <div className="list-item">{bucket.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
