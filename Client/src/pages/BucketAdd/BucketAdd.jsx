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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BucketAdd() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const unsplashURL = import.meta.env.VITE_UNSPLASH_URL;
  const unsplashAPI = import.meta.env.VITE_UNSPLASH_API;
  const [isSubmitting, setIsSubmitting] = useState(false);

  let navigate = useNavigate();

  const [bucketTitle, setBucketTitle] = useState("");
  const [photoSearch, setPhotoSearch] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(
    "http://localhost:8080/images/default-banner.jpeg"
  );
  const [bucketTheme, setBucketTheme] = useState("Coffee");

  const themes = [
    "Coffee",
    "Travel",
    "Navy",
    "Rose",
    "Desert",
    "Royal",
    "Elegant",
  ];

  const notifySuccess = (url) =>
    toast.success("Bucket Created! Redirecting...", {
      onClose: () => navigate(`/${url}`),
    });
  const notifyError = () => toast.error("Unable to create Bucket...");

  async function addBucketList() {
    const token = localStorage.getItem("token");

    try {
      let newBucket = {
        title: bucketTitle,
        theme_name: bucketTheme,
        image_url: selectedPhoto,
      };

      setIsSubmitting(true);

      let response = await axios.post(`${backendUrl}/bucket/`, newBucket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess(response.data.id);
    } catch (error) {
      console.log(error);
      notifyError();
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

    if (!isSubmitting) {
      addBucketList();
    }
  }

  function updateBanner(photoURL) {
    setSelectedPhoto(photoURL);
    window.scrollTo(0, 0);
  }

  async function findPhotos() {
    let results = await axios.get(
      `${unsplashURL}/search/photos/?client_id=${unsplashAPI}&page=1&per_page=6&query=${photoSearch}`
    );
    setPhotoList(results.data.results);
  }

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
        <Link to={`/`}>
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
      <div className="add-page">
        <div className="add-title__box">
          <h1 className="add-title">{bucketTitle}</h1>
        </div>
        <form onSubmit={submitEdit} className="add-form">
          <div className="form-box__wrapper-left">
            <div className="form__box">
              <input
                type="text"
                placeholder="Enter a Title"
                value={bucketTitle}
                onChange={titleChange}
                className="form__input"
                required
              />
            </div>

            <div className="form__box">
              <div className="theme-dropdown">
                <select
                  id="theme"
                  value={bucketTheme}
                  onChange={updateTheme}
                  className="form__input"
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
          </div>
          <div className="selected-photo">
            <h2 className="full">Selected Banner</h2>
            <img src={selectedPhoto} className="selected-thumbnail" />
          </div>
          <div
            className={
              bucketTheme === "Navy"
                ? "Navy-photo-list"
                : bucketTheme === "Travel"
                ? "Travel-photo-list"
                : bucketTheme === "Rose"
                ? "Rose-photo-list"
                : bucketTheme === "Desert"
                ? "Desert-photo-list"
                : bucketTheme === "Royal"
                ? "Royal-photo-list"
                : bucketTheme === "Elegant"
                ? "Elegant-photo-list"
                : "Coffee-photo-list"
            }
          >
            <div className="form__box">
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
                className="form__input"
              />

              <button
                type="button"
                onClick={findPhotos}
                id="search-button"
                className={
                  bucketTheme === "Navy"
                    ? "Navy-button"
                    : bucketTheme === "Travel"
                    ? "Travel-button"
                    : bucketTheme === "Rose"
                    ? "Rose-button"
                    : bucketTheme === "Desert"
                    ? "Desert-button"
                    : bucketTheme === "Royal"
                    ? "Royal-button"
                    : bucketTheme === "Elegant"
                    ? "Elegant-button"
                    : "Coffee-button"
                }
              >
                Search
              </button>
            </div>
            {photoList.map((photo, index) => (
              <img
                src={photo.urls.regular}
                key={index}
                className="thumbnails"
                onClick={() => {
                  updateBanner(photo.urls.regular);
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={
              bucketTheme === "Navy"
                ? "button Navy-page full"
                : bucketTheme === "Travel"
                ? "button Travel-page full"
                : bucketTheme === "Rose"
                ? "button Rose-page full"
                : bucketTheme === "Desert"
                ? "button Desert-page full"
                : bucketTheme === "Royal"
                ? "button Royal-page full"
                : bucketTheme === "Elegant"
                ? "button Elegant-page full"
                : "button Coffee-page full"
            }
          >
            <img
              src={saveButton}
              className={
                bucketTheme === "Navy"
                  ? "save-button Navy-filter"
                  : bucketTheme === "Travel"
                  ? "save-button Travel-filter"
                  : bucketTheme === "Rose"
                  ? "save-button Rose-filter"
                  : bucketTheme === "Desert"
                  ? "save-button Desert-filter"
                  : bucketTheme === "Royal"
                  ? "save-button Royal-filter"
                  : bucketTheme === "Elegant"
                  ? "save-button Elegant-filter"
                  : "save-button Coffee-filter"
              }
            />
          </button>
        </form>
      </div>
      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}
