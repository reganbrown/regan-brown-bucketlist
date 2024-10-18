import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import saveButton from "../../assets/save.svg";
import "./BucketAdd.scss";
import axios from "axios";

export default function BucketAdd() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const unsplashURL = import.meta.env.VITE_UNSPLASH_URL;
  const unsplashAPI = import.meta.env.VITE_UNSPLASH_API;

  let navigate = useNavigate();

  const [bucketTitle, setBucketTitle] = useState("Title");
  const [photoSearch, setPhotoSearch] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(
    "https://www.discoverboating.com/sites/default/files/boating-camping-activity.jpg"
  );
  const [bucketTheme, setBucketTheme] = useState("Coffee");

  const themes = [
    "Coffee",
    "Travel",
    "Adventure",
    "Rose",
    "Grink",
    "Royal",
    "Elegant",
  ];

  async function addBucketList() {
    const token = localStorage.getItem("token");

    try {
      let newBucket = {
        title: bucketTitle,
        theme_name: bucketTheme,
        image_url: selectedPhoto,
      };

      await axios.post(`${backendUrl}/bucket/`, newBucket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  function titleChange(event) {
    setBucketTitle(event.target.value);
  }

  function photoChange(event) {
    setPhotoSearch(event.target.value);
  }

  function updateTheme(event) {
    setBucketTheme(event.target.value);
  }

  function submitEdit(event) {
    event.preventDefault();

    addBucketList();
  }

  async function findPhotos() {
    let results = await axios.get(
      `${unsplashURL}/search/photos/?client_id=${unsplashAPI}&page=1&per_page=6&query=${photoSearch}`
    );
    console.log(results.data.results);
    setPhotoList(results.data.results);
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
        <Link to={`/`}>
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
      <div className="add-page">
        <h1 className="add-title">{bucketTitle}</h1>
        <form onSubmit={submitEdit} className="add-form">
          <div className="form-box">
            <input
              type="text"
              placeholder="Title"
              value={bucketTitle}
              onChange={titleChange}
              className="form-input"
            />
          </div>

          <div className="form-box">
            <div className="theme-dropdown">
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
            </div>
          </div>
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-photo-list"
                : bucketTheme === "Travel"
                ? "travel-photo-list"
                : bucketTheme === "Rose"
                ? "rose-photo-list"
                : bucketTheme === "Grink"
                ? "grink-photo-list"
                : bucketTheme === "Royal"
                ? "royal-photo-list"
                : bucketTheme === "Elegant"
                ? "elegant-photo-list"
                : "coffee-photo-list"
            }
          >
            <div className="form-box">
              <input
                type="text"
                placeholder="Search for photo"
                value={photoSearch}
                onChange={photoChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    document.getElementById("search-button").click();
                  }
                }}
                className="form-input"
              />

              <button
                type="button"
                onClick={findPhotos}
                id="search-button"
                className="search-button"
              >
                Search for Banners
              </button>
            </div>
            {photoList.map((photo, index) => (
              <img
                src={photo.urls.regular}
                key={index}
                className="thumbnails"
                onClick={() => {
                  setSelectedPhoto(photo.urls.regular);
                }}
              />
            ))}
          </div>

          <div className="selected-photo">
            <h2 className="selected-photo-banner">Selected Banner</h2>
            <img src={selectedPhoto} className="selected-thumbnail" />
          </div>

          <button
            type="submit"
            className={
              bucketTheme === "Adventure"
                ? "button adventure-page full"
                : bucketTheme === "Travel"
                ? "button travel-page full"
                : bucketTheme === "Rose"
                ? "button rose-page full"
                : bucketTheme === "Grink"
                ? "button grink-page full"
                : bucketTheme === "Royal"
                ? "button royal-page full"
                : bucketTheme === "Elegant"
                ? "button elegant-page full"
                : "button coffee-page full"
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
        </form>
      </div>
    </div>
  );
}
