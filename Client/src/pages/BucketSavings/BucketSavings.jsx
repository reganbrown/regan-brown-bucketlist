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
  const [savingsAmount, setSavingsAmount] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/account");
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
    setSavingsAmount(event.target.value);
  }

  function submitSavings(event) {
    event.preventDefault();
    addSavings();
    setSavingsAmount("");
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
        bucketTheme === "Navy"
          ? "container Navy-page"
          : bucketTheme === "Travel"
          ? "container Travel-page"
          : bucketTheme === "Rose"
          ? "container Rose-page"
          : bucketTheme === "Desert"
          ? "container Desert-page"
          : bucketTheme === "Royal"
          ? "container Royal-page"
          : bucketTheme === "Elegant"
          ? "container Elegant-page"
          : "container Coffee-page"
      }
    >
      <div className="header">
        <Link to={`/${bucketID}`}>
          <img
            src={arrowBack}
            className={
              bucketTheme === "Navy"
                ? "logo Navy-filter"
                : bucketTheme === "Travel"
                ? "logo Travel-filter"
                : bucketTheme === "Rose"
                ? "logo Rose-filter"
                : bucketTheme === "Desert"
                ? "logo Desert-filter"
                : bucketTheme === "Royal"
                ? "logo Royal-filter"
                : bucketTheme === "Elegant"
                ? "logo Elegant-filter"
                : "logo Coffee-filter"
            }
          />
        </Link>
        <Link to={`/`}>
          <img
            src={bucketLogo}
            className={
              bucketTheme === "Navy"
                ? "logo Navy-filter"
                : bucketTheme === "Travel"
                ? "logo Travel-filter"
                : bucketTheme === "Rose"
                ? "logo Rose-filter"
                : bucketTheme === "Desert"
                ? "logo Desert-filter"
                : bucketTheme === "Royal"
                ? "logo Royal-filter"
                : bucketTheme === "Elegant"
                ? "logo Elegant-filter"
                : "logo Coffee-filter"
            }
          />
        </Link>
        <Link to={`/account`}>
          <img
            src={accountLogo}
            className={
              bucketTheme === "Navy"
                ? "logo Navy-filter"
                : bucketTheme === "Travel"
                ? "logo Travel-filter"
                : bucketTheme === "Rose"
                ? "logo Rose-filter"
                : bucketTheme === "Desert"
                ? "logo Desert-filter"
                : bucketTheme === "Royal"
                ? "logo Royal-filter"
                : bucketTheme === "Elegant"
                ? "logo Elegant-filter"
                : "logo Coffee-filter"
            }
          />
        </Link>
      </div>
      <h1>Bucket Savings</h1>
      {savings.map((item) => (
        <div key={item.id} className="finance-list">
          <div
            className={
              bucketTheme === "Navy"
                ? "Navy-finance-box"
                : bucketTheme === "Travel"
                ? "Travel-finance-box"
                : bucketTheme === "Rose"
                ? "Rose-finance-box"
                : bucketTheme === "Desert"
                ? "Desert-finance-box"
                : bucketTheme === "Royal"
                ? "Royal-finance-box"
                : bucketTheme === "Elegant"
                ? "Elegant-finance-box"
                : "Coffee-finance-box"
            }
          >
            {item.user_name}
          </div>
          <div
            className={
              bucketTheme === "Navy"
                ? "Navy-finance-box"
                : bucketTheme === "Travel"
                ? "Travel-finance-box"
                : bucketTheme === "Rose"
                ? "Rose-finance-box"
                : bucketTheme === "Desert"
                ? "Desert-finance-box"
                : bucketTheme === "Royal"
                ? "Royal-finance-box"
                : bucketTheme === "Elegant"
                ? "Elegant-finance-box"
                : "Coffee-finance-box"
            }
          >
            {item.amount}
          </div>
          <div
            className={
              bucketTheme === "Navy"
                ? "Navy-finance-box"
                : bucketTheme === "Travel"
                ? "Travel-finance-box"
                : bucketTheme === "Rose"
                ? "Rose-finance-box"
                : bucketTheme === "Desert"
                ? "Desert-finance-box"
                : bucketTheme === "Royal"
                ? "Royal-finance-box"
                : bucketTheme === "Elegant"
                ? "Elegant-finance-box"
                : "Coffee-finance-box"
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
              bucketTheme === "Navy"
                ? "button Navy-page"
                : bucketTheme === "Travel"
                ? "button Travel-page"
                : bucketTheme === "Rose"
                ? "button Rose-page"
                : bucketTheme === "Desert"
                ? "button Desert-page"
                : bucketTheme === "Royal"
                ? "button Royal-page"
                : bucketTheme === "Elegant"
                ? "button Elegant-page"
                : "button Coffee-page"
            }
          >
            <img
              src={deleteButton}
              className={
                bucketTheme === "Navy"
                  ? "delete-button Navy-filter"
                  : bucketTheme === "Travel"
                  ? "delete-button Travel-filter"
                  : bucketTheme === "Rose"
                  ? "delete-button Rose-filter"
                  : bucketTheme === "Desert"
                  ? "delete-button Desert-filter"
                  : bucketTheme === "Royal"
                  ? "delete-button Royal-filter"
                  : bucketTheme === "Elegant"
                  ? "delete-button Elegant-filter"
                  : "delete-button Coffee-filter"
              }
            />
          </button>
        </div>
      ))}
      <form onSubmit={submitSavings} className="expense-form">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Savings Amount"
          className="form__input full"
          value={savingsAmount}
          onChange={changeAmount}
        />
        <button
          type="submit"
          className={
            bucketTheme === "Navy"
              ? "Navy-button-alt"
              : bucketTheme === "Travel"
              ? "Travel-button-alt"
              : bucketTheme === "Rose"
              ? "Rose-button-alt"
              : bucketTheme === "Desert"
              ? "Desert-button-alt"
              : bucketTheme === "Royal"
              ? "Royal-button-alt"
              : bucketTheme === "Elegant"
              ? "Elegant-button-alt"
              : "Coffee-button-alt"
          }
        >
          +
        </button>
      </form>
    </div>
  );
}
