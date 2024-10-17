import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BucketSavings() {
  let { bucketID } = useParams();
  const [savings, setSavings] = useState([]);

  const getSavings = async () => {
    let results = await axios.get(
      `http://localhost:8080/bucket/${bucketID}/savings`
    );
    setSavings(results.data);
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
