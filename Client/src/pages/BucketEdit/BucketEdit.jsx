import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import saveButton from "../../assets/save.svg";
import deleteButton from "../../assets/delete.svg";
import axios from "axios";
import "./BucketEdit.scss";

export default function BucketEdit() {
  let navigate = useNavigate();
  let { bucketID } = useParams();

  const [bucketTitle, setBucketTitle] = useState("");
  const [bucketTheme, setBucketTheme] = useState("");

  const themes = [
    "Travel",
    "Adventure",
    "Rose",
    "Grink",
    "Royal",
    "Elegant",
    "Coffee",
  ];

  const getBucket = async () => {
    try {
      let results = await axios.get(`http://localhost:8080/bucket/${bucketID}`);
      setBucketTitle(results.data.bucket.title);
      setBucketTheme(results.data.bucket.theme_name);
    } catch (error) {
      navigate("/404");
    }
  };

  async function updateBucketDetails() {
    try {
      let bucketUpdate = {
        title: bucketTitle,
        theme_name: bucketTheme,
      };

      await axios.put(`http://localhost:8080/bucket/${bucketID}`, bucketUpdate);
      navigate(`/bucketlist/${bucketID}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBucket() {
    try {
      await axios.delete(`http://localhost:8080/bucket/${bucketID}`);
      navigate("/bucketlist");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBucket();
  }, [bucketID]);

  function titleChange(event) {
    setBucketTitle(event.target.value);
  }

  function updateTheme(event) {
    setBucketTheme(event.target.value);
  }

  function submitEdit(event) {
    event.preventDefault();

    updateBucketDetails();
  }

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
        <Link to={`/bucketlist`}>
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
      </div>
      <h1>{bucketTitle} Edit</h1>
      <form onSubmit={submitEdit} className="edit-form">
        <label>
          Title:
          <input
            type="text"
            placeholder="enter title"
            value={bucketTitle}
            onChange={titleChange}
            className="form-input"
          />
        </label>

        <div className="theme-dropdown">
          <label>
            Select a Theme
            <select
              id="theme"
              value={bucketTheme}
              onChange={updateTheme}
              className="form-input"
            >
              <option value="" disabled>
                Select a theme
              </option>
              {themes.map((theme, index) => (
                <option key={index} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
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
            src={saveButton}
            className={
              bucketTheme === "Adventure"
                ? "save-button adventure-filter"
                : bucketTheme === "Travel"
                ? "save-button travel-filter"
                : bucketTheme === "Rose"
                ? "save-button rose-filter"
                : bucketTheme === "Grink"
                ? "save-button grink-filter"
                : bucketTheme === "Royal"
                ? "save-button royal-filter"
                : bucketTheme === "Elegant"
                ? "save-button elegant-filter"
                : "save-button coffee-filter"
            }
          />
        </button>
        <button
          type="button"
          onClick={deleteBucket}
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
      </form>
    </div>
  );
}
