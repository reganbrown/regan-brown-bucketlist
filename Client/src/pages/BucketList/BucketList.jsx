import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <>
      <h1>Bucket List</h1>
      {buckets.map((bucket) => (
        <Link to={`/bucketlist/${bucket.id}`} key={bucket.id}>
          <div>{bucket.title}</div>
        </Link>
      ))}
    </>
  );
}
