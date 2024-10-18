import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import axios from "axios";
import "./BucketDetails.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BucketDetails() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let navigate = useNavigate();
  let { bucketID } = useParams();

  const [bucket, setBucket] = useState([]);

  const [userRole, setUserRole] = useState([]);

  const [expensesTotal, setExpensesTotal] = useState();

  const [savingsTotal, setSavingsTotal] = useState();
  const [percent, setPercent] = useState();

  const getExpenses = async () => {
    let results = await axios.get(`${backendUrl}/bucket/${bucketID}/expenses`);
    let result = results.data;
    let total = 0;
    result.map((item) => {
      total = total + Number(item.amount);
    });
    setExpensesTotal(total);
  };

  const getSavings = async () => {
    let results = await axios.get(`${backendUrl}/bucket/${bucketID}/savings`);
    let result = results.data;
    let total = 0;
    result.map((item) => {
      total = total + Number(item.amount);
    });
    setSavingsTotal(total);
  };

  const getBucket = async () => {
    try {
      let results = await axios.get(`${backendUrl}/bucket/${bucketID}`);
      setBucket(results.data.bucket);
      setUserRole(results.data.userRole);
    } catch (error) {
      navigate("/404");
    }
  };

  function percentage() {
    let percent = (savingsTotal / expensesTotal) * 100;
    setPercent(Math.round(percent));
  }

  useEffect(() => {
    getBucket();
    getExpenses();
    getSavings();
  }, [bucketID]);

  useEffect(() => {
    if (expensesTotal !== undefined && savingsTotal !== undefined) {
      if (expensesTotal === 0 && savingsTotal === 0) {
        setPercent(0);
      } else if (expensesTotal === 0 && savingsTotal !== 0) {
        setPercent(100);
      } else {
        percentage();
      }
    }
  }, [expensesTotal, savingsTotal]);

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
        <Link to={`/`}>
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
      <div className="bucket-body">
        <div className="app-wrapper-left">
          <div
            className={
              bucket.theme_name === "Coffee"
                ? "bucket-list-title__coffee"
                : "bucket-list-title"
            }
          >
            BUCKET LIST
          </div>
          <h1 className="title">{bucket.title}</h1>
          <div className="bucket-links">
            <Link to={`/${bucketID}/expenses`} className="link">
              <div
                className={
                  bucket.theme_name === "Coffee"
                    ? "finance-button__coffee"
                    : "finance-button"
                }
              >
                EXPENSES
              </div>
            </Link>

            <Link to={`/${bucketID}/savings`} className="link">
              <div
                className={
                  bucket.theme_name === "Coffee"
                    ? "finance-button__coffee"
                    : "finance-button"
                }
              >
                SAVINGS
              </div>
            </Link>

            <Link to={`/bucketlist/${bucketID}/chat`} className="link">
              <div
                className={
                  bucket.theme_name === "Coffee"
                    ? "finance-button__coffee"
                    : "finance-button"
                }
              >
                CHAT
              </div>
            </Link>

            <div className="bucket-links__wrapper">
              <Link
                to={`/${bucketID}/edit`}
                className={userRole === "owner" ? "link" : "contributor-hidden"}
              >
                <div
                  className={
                    userRole === "owner"
                      ? bucket.theme_name === "Coffee"
                        ? "edit-button__coffee"
                        : "edit-button"
                      : "contributor-hidden"
                  }
                >
                  EDIT
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="app-wrapper-right">
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            styles={{
              path: {
                stroke:
                  bucket.theme_name === "Adventure"
                    ? "#bf1717"
                    : bucket.theme_name === "Travel"
                    ? "#1e3f20"
                    : bucket.theme_name === "Rose"
                    ? "#f7c1bb"
                    : bucket.theme_name === "Grink"
                    ? "#edadc7"
                    : bucket.theme_name === "Royal"
                    ? "#eca400"
                    : bucket.theme_name === "Elegant"
                    ? "#5f506b"
                    : "#63372c",
              },
              // Customize the text
              text: {
                // Text color
                fill:
                  bucket.theme_name === "Adventure"
                    ? "#bf1717"
                    : bucket.theme_name === "Travel"
                    ? "#1e3f20"
                    : bucket.theme_name === "Rose"
                    ? "#f7c1bb"
                    : bucket.theme_name === "Grink"
                    ? "#edadc7"
                    : bucket.theme_name === "Royal"
                    ? "#eca400"
                    : bucket.theme_name === "Elegant"
                    ? "#5f506b"
                    : "#63372c",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
