import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BucketDetails.scss";

export default function BucketDetails() {
  let { bucketID } = useParams();

  const [bucket, setBucket] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);

  const getBucket = async () => {
    let results = await axios.get(`http://localhost:8080/bucket/${bucketID}`);
    setBucket(results.data);
  };

  const getExpenses = async () => {
    let results = await axios.get(
      `http://localhost:8080/bucket/${bucketID}/expenses`
    );
    console.log(results.data);
    setExpenses(results.data);
  };

  const getSavings = async () => {
    let results = await axios.get(
      `http://localhost:8080/bucket/${bucketID}/savings`
    );
    console.log(results.data);
    setSavings(results.data);
  };

  useEffect(() => {
    getBucket();
    getExpenses();
    getSavings();
  }, []);

  return (
    <div
      className={
        bucket.theme_name === "Adventure"
          ? "container adventure-secondary"
          : "container travel-secondary"
      }
    >
      <img src={bucket.image_url} className="banner-image" />
      <h1
        className={
          bucket.theme_name === "Adventure"
            ? "adventure-primary"
            : "travel-primary"
        }
      >
        Bucket Details: {bucket.title}
      </h1>
      <h2>Expenses</h2>
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-list">
          <p>{expense.expense_name}</p>
          <p>{expense.amount}</p>
          <p>{expense.notes}</p>
        </div>
      ))}

      <h2>Savings</h2>
      {savings.map((item) => (
        <div key={item.id} className="expense-list">
          <p>{item.saver_name}</p>
          <p>{item.amount}</p>
          <p>{item.date_added}</p>
        </div>
      ))}
    </div>
  );
}
