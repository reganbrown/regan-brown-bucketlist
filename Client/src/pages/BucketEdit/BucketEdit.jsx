import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import saveButton from "../../assets/save.svg";
import deleteButton from "../../assets/delete.svg";
import axios from "axios";
import "./BucketEdit.scss";

export default function BucketEdit() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const unsplashURL = import.meta.env.VITE_UNSPLASH_URL;
  const unsplashAPI = import.meta.env.VITE_UNSPLASH_API;
  let navigate = useNavigate();
  let { bucketID } = useParams();

  const [bucketTitle, setBucketTitle] = useState("");
  const [bucketTheme, setBucketTheme] = useState("");
  const [photoSearch, setPhotoSearch] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const themes = [
    "Coffee",
    "Travel",
    "Adventure",
    "Rose",
    "Grink",
    "Royal",
    "Elegant",
  ];

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const getBucket = async () => {
    try {
      let results = await axios.get(`${backendUrl}/bucket/${bucketID}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBucketTitle(results.data.bucket.title);
      setBucketTheme(results.data.bucket.theme_name);
      setSelectedPhoto(results.data.bucket.image_url);
    } catch (error) {
      navigate("/404");
    }
  };

  async function updateBucketDetails() {
    try {
      let bucketUpdate = {
        title: bucketTitle,
        theme_name: bucketTheme,
        image_url: selectedPhoto,
      };

      await axios.put(`${backendUrl}/bucket/${bucketID}`, bucketUpdate, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      navigate(`/${bucketID}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBucket() {
    try {
      await axios.delete(`${backendUrl}/bucket/${bucketID}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      navigate("/");
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

  function photoChange(event) {
    setPhotoSearch(event.target.value);
  }

  async function findPhotos() {
    let results = await axios.get(
      `${unsplashURL}/search/photos/?client_id=${unsplashAPI}&page=1&per_page=6&query=${photoSearch}`
    );
    setPhotoList(results.data.results);
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
      <div className="add-page">
        <h1 className="add-title">{bucketTitle}</h1>
        <form onSubmit={submitEdit} className="add-form">
          <div className="form-box">
            <input
              type="text"
              placeholder="enter title"
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
    </div>
  );
}
