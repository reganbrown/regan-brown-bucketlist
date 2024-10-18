import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import deleteButton from "../../assets/delete.svg";
import axios from "axios";
import timeConvert from "../../utilities/timeConvert";

export default function BucketSavings() {
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let { bucketID } = useParams();
  const [bucketTheme, setBucketTheme] = useState([]);
  const [savings, setSavings] = useState([]);
  const [savingsAmount, setExpenseAmount] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
      const sortedSavings = results.data.sort(
        (a, b) => a.date_added - b.date_added
      );
      setSavings(sortedSavings);
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
      setBucketTheme(results.data.bucket.theme_name);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    getBucket();
    getSavings();
  }, [bucketID]);

  const addSavings = async () => {
    let newSavings = {
      amount: savingsAmount,
    };
    let results = await axios.post(
      `${backendUrl}/bucket/${bucketID}/savings`,
      newSavings,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    getSavings();
  };

  function changeAmount(event) {
    setExpenseAmount(event.target.value);
  }

  function submitSavings(event) {
    event.preventDefault();
    addSavings();
  }

  async function deleteSavings(savingsID) {
    try {
      await axios.delete(
        `${backendUrl}/bucket/${bucketID}/savings/${savingsID}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      getSavings();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSavings();
  }, [bucketID]);

  return (
    <div
      className={
        bucketTheme === "Adventure"
          ? "container adventure-page"
          : bucketTheme === "Travel"
          ? "container travel-page"
          : bucketTheme === "Rose"
          ? "container rose-page"
          : bucketTheme === "Grink"
          ? "container grink-page"
          : bucketTheme === "Royal"
          ? "container royal-page"
          : bucketTheme === "Elegant"
          ? "container elegant-page"
          : "container coffee-page"
      }
    >
      <div className="header">
        <Link to={`/${bucketID}`}>
          <img
            src={arrowBack}
            className={
              bucketTheme === "Adventure"
                ? "logo adventure-filter"
                : bucketTheme === "Travel"
                ? "logo travel-filter"
                : bucketTheme === "Rose"
                ? "logo rose-filter"
                : bucketTheme === "Grink"
                ? "logo grink-filter"
                : bucketTheme === "Royal"
                ? "logo royal-filter"
                : bucketTheme === "Elegant"
                ? "logo elegant-filter"
                : "logo coffee-filter"
            }
          />
        </Link>
        <Link to={`/`}>
          <img
            src={bucketLogo}
            className={
              bucketTheme === "Adventure"
                ? "logo adventure-filter"
                : bucketTheme === "Travel"
                ? "logo travel-filter"
                : bucketTheme === "Rose"
                ? "logo rose-filter"
                : bucketTheme === "Grink"
                ? "logo grink-filter"
                : bucketTheme === "Royal"
                ? "logo royal-filter"
                : bucketTheme === "Elegant"
                ? "logo elegant-filter"
                : "logo coffee-filter"
            }
          />
        </Link>
        <Link to={`/account`}>
          <img
            src={accountLogo}
            className={
              bucketTheme === "Adventure"
                ? "logo adventure-filter"
                : bucketTheme === "Travel"
                ? "logo travel-filter"
                : bucketTheme === "Rose"
                ? "logo rose-filter"
                : bucketTheme === "Grink"
                ? "logo grink-filter"
                : bucketTheme === "Royal"
                ? "logo royal-filter"
                : bucketTheme === "Elegant"
                ? "logo elegant-filter"
                : "logo coffee-filter"
            }
          />
        </Link>
      </div>
      <h1>Bucket Savings</h1>
      {savings.map((item) => (
        <div key={item.id} className="finance-list">
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-finance-box"
                : bucketTheme === "Travel"
                ? "travel-finance-box"
                : bucketTheme === "Rose"
                ? "rose-finance-box"
                : bucketTheme === "Grink"
                ? "grink-finance-box"
                : bucketTheme === "Royal"
                ? "royal-finance-box"
                : bucketTheme === "Elegant"
                ? "elegant-finance-box"
                : "coffee-finance-box"
            }
          >
            {item.user_name}
          </div>
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-finance-box"
                : bucketTheme === "Travel"
                ? "travel-finance-box"
                : bucketTheme === "Rose"
                ? "rose-finance-box"
                : bucketTheme === "Grink"
                ? "grink-finance-box"
                : bucketTheme === "Royal"
                ? "royal-finance-box"
                : bucketTheme === "Elegant"
                ? "elegant-finance-box"
                : "coffee-finance-box"
            }
          >
            {item.amount}
          </div>
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-finance-box"
                : bucketTheme === "Travel"
                ? "travel-finance-box"
                : bucketTheme === "Rose"
                ? "rose-finance-box"
                : bucketTheme === "Grink"
                ? "grink-finance-box"
                : bucketTheme === "Royal"
                ? "royal-finance-box"
                : bucketTheme === "Elegant"
                ? "elegant-finance-box"
                : "coffee-finance-box"
            }
          >
            {timeConvert(item.date_added)}
          </div>
          <button
            type="button"
            onClick={() => {
              deleteSavings(item.id);
            }}
            className={
              bucketTheme === "Adventure"
                ? "button adventure-page"
                : bucketTheme === "Travel"
                ? "button travel-page"
                : bucketTheme === "Rose"
                ? "button rose-page"
                : bucketTheme === "Grink"
                ? "button grink-page"
                : bucketTheme === "Royal"
                ? "button royal-page"
                : bucketTheme === "Elegant"
                ? "button elegant-page"
                : "button coffee-page"
            }
          >
            <img
              src={deleteButton}
              className={
                bucketTheme === "Adventure"
                  ? "delete-button adventure-filter"
                  : bucketTheme === "Travel"
                  ? "delete-button travel-filter"
                  : bucketTheme === "Rose"
                  ? "delete-button rose-filter"
                  : bucketTheme === "Grink"
                  ? "delete-button grink-filter"
                  : bucketTheme === "Royal"
                  ? "delete-button royal-filter"
                  : bucketTheme === "Elegant"
                  ? "delete-button elegant-filter"
                  : "delete-button coffee-filter"
              }
            />
          </button>
        </div>
      ))}
      <form onSubmit={submitSavings}>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Savings Amount"
          value={savingsAmount}
          onChange={changeAmount}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
