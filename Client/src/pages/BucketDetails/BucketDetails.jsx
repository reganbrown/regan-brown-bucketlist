import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/account");
    }
  }, [navigate]);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getExpenses = async () => {
    try {
      let results = await axios.get(
        `${backendUrl}/bucket/${bucketID}/expenses`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      let result = results.data;
      let total = 0;
      result.forEach((item) => {
        total += Number(item.amount);
      });
      setExpensesTotal(total);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const getSavings = async () => {
    try {
      let results = await axios.get(
        `${backendUrl}/bucket/${bucketID}/savings`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      let result = results.data;
      let total = 0;
      result.forEach((item) => {
        total += Number(item.amount);
      });
      setSavingsTotal(total);
    } catch (error) {
      console.error("Error fetching savings:", error);
    }
  };

  const getBucket = async () => {
    try {
      let results = await axios.get(`${backendUrl}/bucket/${bucketID}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
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
        bucket.theme_name === "Navy"
          ? "container Navy-page"
          : bucket.theme_name === "Travel"
          ? "container Travel-page"
          : bucket.theme_name === "Rose"
          ? "container Rose-page"
          : bucket.theme_name === "Desert"
          ? "container Desert-page"
          : bucket.theme_name === "Royal"
          ? "container Royal-page"
          : bucket.theme_name === "Elegant"
          ? "container Elegant-page"
          : "container Coffee-page"
      }
    >
      <div className="header">
        <Link to={`/`}>
          <img
            src={arrowBack}
            className={
              bucket.theme_name === "Navy"
                ? "logo Navy-filter"
                : bucket.theme_name === "Travel"
                ? "logo Travel-filter"
                : bucket.theme_name === "Rose"
                ? "logo Rose-filter"
                : bucket.theme_name === "Desert"
                ? "logo Desert-filter"
                : bucket.theme_name === "Royal"
                ? "logo Royal-filter"
                : bucket.theme_name === "Elegant"
                ? "logo Elegant-filter"
                : "logo Coffee-filter"
            }
          />
        </Link>
        <Link to={`/`}>
          <img
            src={bucketLogo}
            className={
              bucket.theme_name === "Navy"
                ? "logo Navy-filter"
                : bucket.theme_name === "Travel"
                ? "logo Travel-filter"
                : bucket.theme_name === "Rose"
                ? "logo Rose-filter"
                : bucket.theme_name === "Desert"
                ? "logo Desert-filter"
                : bucket.theme_name === "Royal"
                ? "logo Royal-filter"
                : bucket.theme_name === "Elegant"
                ? "logo Elegant-filter"
                : "logo Coffee-filter"
            }
          />
        </Link>
        <Link to={`/account`}>
          <img
            src={accountLogo}
            className={
              bucket.theme_name === "Navy"
                ? "logo Navy-filter"
                : bucket.theme_name === "Travel"
                ? "logo Travel-filter"
                : bucket.theme_name === "Rose"
                ? "logo Rose-filter"
                : bucket.theme_name === "Desert"
                ? "logo Desert-filter"
                : bucket.theme_name === "Royal"
                ? "logo Royal-filter"
                : bucket.theme_name === "Elegant"
                ? "logo Elegant-filter"
                : "logo Coffee-filter"
            }
          />
        </Link>
      </div>
      <img src={bucket.image_url} className="banner-image" />
      <div className="bucket__body">
        <div className="app__wrapper--left">
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
          <div className="bucket__links">
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

            <Link to={`/${bucketID}/chat`} className="link">
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

            <div className="bucket__links--wrapper">
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
        <div className="app__wrapper--right">
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            styles={{
              path: {
                stroke:
                  bucket.theme_name === "Navy"
                    ? "#3c4f76"
                    : bucket.theme_name === "Travel"
                    ? "#1e3f20"
                    : bucket.theme_name === "Rose"
                    ? "#f7c1bb"
                    : bucket.theme_name === "Desert"
                    ? "#e07a5f"
                    : bucket.theme_name === "Royal"
                    ? "#eca400"
                    : bucket.theme_name === "Elegant"
                    ? "#011638"
                    : "#63372c",
              },
              text: {
                fill:
                  bucket.theme_name === "Navy"
                    ? "#3c4f76"
                    : bucket.theme_name === "Travel"
                    ? "#1e3f20"
                    : bucket.theme_name === "Rose"
                    ? "#f7c1bb"
                    : bucket.theme_name === "Desert"
                    ? "#e07a5f"
                    : bucket.theme_name === "Royal"
                    ? "#eca400"
                    : bucket.theme_name === "Elegant"
                    ? "#011638"
                    : "#63372c",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
