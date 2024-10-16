import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
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
          ? "container adventure-page"
          : bucket.theme_name === "Travel"
          ? "container travel-page"
          : bucket.theme_name === "Rose"
          ? "container rose-page"
          : bucket.theme_name === "Grink"
          ? "container grink-page"
          : bucket.theme_name === "Royal"
          ? "container royal-page"
          : bucket.theme_name === "Elegant"
          ? "container elegant-page"
          : "container coffee-page"
      }
    >
      <div className="header">
        <Link to={`/bucketlist`}>
          <img
            src={arrowBack}
            className={
              bucket.theme_name === "Adventure"
                ? "logo adventure-filter"
                : bucket.theme_name === "Travel"
                ? "logo travel-filter"
                : bucket.theme_name === "Rose"
                ? "logo rose-filter"
                : bucket.theme_name === "Grink"
                ? "logo grink-filter"
                : bucket.theme_name === "Royal"
                ? "logo royal-filter"
                : bucket.theme_name === "Elegant"
                ? "logo elegant-filter"
                : "logo coffee-filter"
            }
          />
        </Link>
        <Link to={`/`}>
          <img
            src={bucketLogo}
            className={
              bucket.theme_name === "Adventure"
                ? "logo adventure-filter"
                : bucket.theme_name === "Travel"
                ? "logo travel-filter"
                : bucket.theme_name === "Rose"
                ? "logo rose-filter"
                : bucket.theme_name === "Grink"
                ? "logo grink-filter"
                : bucket.theme_name === "Royal"
                ? "logo royal-filter"
                : bucket.theme_name === "Elegant"
                ? "logo elegant-filter"
                : "logo coffee-filter"
            }
          />
        </Link>
        <img
          src={accountLogo}
          className={
            bucket.theme_name === "Adventure"
              ? "logo adventure-filter"
              : bucket.theme_name === "Travel"
              ? "logo travel-filter"
              : bucket.theme_name === "Rose"
              ? "logo rose-filter"
              : bucket.theme_name === "Grink"
              ? "logo grink-filter"
              : bucket.theme_name === "Royal"
              ? "logo royal-filter"
              : bucket.theme_name === "Elegant"
              ? "logo elegant-filter"
              : "logo coffee-filter"
          }
        />
      </div>
      <img src={bucket.image_url} className="banner-image" />
      <div className="bucket-title">BUCKET LIST</div>
      <h1>{bucket.title}</h1>
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

      <Link to={`/bucketlist/${bucketID}/edit`} className="link">
        <div className="list-item">EDIT</div>
      </Link>
    </div>
  );
}
