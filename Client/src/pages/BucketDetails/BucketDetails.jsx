import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BucketDetails.scss";

export default function BucketDetails() {
  let { bucketID } = useParams();

  const [bucket, setBucket] = useState([]);

  const getBucket = async () => {
    let results = await axios.get(`http://localhost:8080/bucket/${bucketID}`);
    setBucket(results.data);
  };

  useEffect(() => {
    getBucket();
  }, []);

  return (
    <>
      <img src={bucket.image_url} className="banner-image" />
      <h1>Bucket Details: {bucket.title}</h1>
      <p>Bucket ID: {bucketID}</p>
    </>
  );
}
