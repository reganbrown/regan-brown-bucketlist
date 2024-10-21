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
  const [userSearch, setUserSearch] = useState("");
  const [contributors, setContributors] = useState([]);

  const themes = [
    "Coffee",
    "Travel",
    "Navy",
    "Rose",
    "Desert",
    "Royal",
    "Elegant",
  ];

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/account");
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
    getUsers();
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

  async function addNewUser() {
    let newUser = {
      email: userSearch,
    };

    try {
      let results = await axios.post(
        `${backendUrl}/bucket/${bucketID}/contributors`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      getUsers();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found. Please check the email address.");
      } else if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.log("Error adding user", error);
      }
    }
  }

  async function getUsers() {
    let results = await axios.get(
      `${backendUrl}/bucket/${bucketID}/contributors`,

      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    setContributors(results.data);
  }

  function submitEdit(event) {
    event.preventDefault();
    updateBucketDetails();
  }

  function updateUserSearch(event) {
    event.preventDefault();
    setUserSearch(event.target.value);
  }

  function findUser(event) {
    event.preventDefault();
    addNewUser();
    setUserSearch("");
  }

  async function deleteUser(userID) {
    try {
      await axios.delete(
        `${backendUrl}/bucket/${bucketID}/contributors/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
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
      <div className="add-page">
        <h1 className="add-title">{bucketTitle}</h1>
        <form onSubmit={submitEdit} className="add-form">
          <div className="form-box__wrapper-left">
            <div className="form__box">
              <input
                type="text"
                placeholder="enter title"
                value={bucketTitle}
                onChange={titleChange}
                className="form__input"
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
                ? "Navy-user-list"
                : bucketTheme === "Travel"
                ? "Travel-user-list"
                : bucketTheme === "Rose"
                ? "Rose-user-list"
                : bucketTheme === "Desert"
                ? "Desert-user-list"
                : bucketTheme === "Royal"
                ? "Royal-user-list"
                : bucketTheme === "Elegant"
                ? "Elegant-user-list"
                : "Coffee-user-list"
            }
          >
            <div className="form__box">
              <input
                type="text"
                placeholder="Enter user Email"
                value={userSearch}
                onChange={updateUserSearch}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    document.getElementById("user-search-button").click();
                  }
                }}
                className="form__input"
              />

              <button
                type="button"
                id="user-search-button"
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
                onClick={findUser}
              >
                Add User
              </button>
            </div>
            {contributors.map((contributor, index) => (
              <div key={index} className="contributor-name">
                {contributor.name}
                <button
                  type="button"
                  className={
                    bucketTheme === "Navy"
                      ? "Navy-button button-small"
                      : bucketTheme === "Travel"
                      ? "Travel-button button-small"
                      : bucketTheme === "Rose"
                      ? "Rose-button button-small"
                      : bucketTheme === "Desert"
                      ? "Desert-button button-small"
                      : bucketTheme === "Royal"
                      ? "Royal-button button-small"
                      : bucketTheme === "Elegant"
                      ? "Elegant-button button-small"
                      : "Coffee-button button-small"
                  }
                  onClick={() => {
                    deleteUser(contributor.id);
                  }}
                >
                  X
                </button>
              </div>
            ))}
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
                  setSelectedPhoto(photo.urls.regular);
                }}
              />
            ))}
          </div>
          <button
            type="submit"
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
          <button
            type="button"
            onClick={deleteBucket}
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
        </form>
      </div>
    </div>
  );
}
