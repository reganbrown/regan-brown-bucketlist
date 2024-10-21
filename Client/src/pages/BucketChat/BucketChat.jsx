import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import axios from "axios";
import timeConvert from "../../utilities/timeConvert";
import "./BucketChat.scss";

export default function BucketChat() {
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let { bucketID } = useParams();
  const [bucketTheme, setBucketTheme] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setID] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/account");
    }
  }, [navigate]);

  const getChat = async () => {
    try {
      let results = await axios.get(`${backendUrl}/bucket/${bucketID}/chat`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const sortedChat = results.data.sort(
        (a, b) => a.date_added - b.date_added
      );
      setChat(sortedChat);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  const getAccount = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/userDetails`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { id } = response.data;
      setID(id);
    } catch (error) {
      console.log(error);
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
    getChat();
  }, [bucketID]);

  const addChat = async () => {
    let newChat = {
      bucket_id: bucketID,
      message: message,
    };
    let results = await axios.post(
      `${backendUrl}/bucket/${bucketID}/chat`,
      newChat,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    getChat();
  };

  function changeChat(event) {
    setMessage(event.target.value);
  }

  function submitChat(event) {
    event.preventDefault();
    addChat();
    setMessage("");
  }

  useEffect(() => {
    getChat();
    getAccount();
  }, [bucketID]);

  function scrollToBottom() {
    anchor.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

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
      <h1>Message Board</h1>
      <div className="message__board">
        {chat.map((message) => (
          <div
            key={message.id}
            className={
              message.user_id === Number(id)
                ? bucketTheme === "Navy"
                  ? "user-Navy-chat"
                  : bucketTheme === "Travel"
                  ? "user-Travel-chat"
                  : bucketTheme === "Rose"
                  ? "user-Rose-chat"
                  : bucketTheme === "Desert"
                  ? "user-Desert-chat"
                  : bucketTheme === "Royal"
                  ? "user-Royal-chat"
                  : bucketTheme === "Elegant"
                  ? "user-Elegant-chat"
                  : "user-Coffee-chat"
                : bucketTheme === "Navy"
                ? "Navy-chat"
                : bucketTheme === "Travel"
                ? "Travel-chat"
                : bucketTheme === "Rose"
                ? "Rose-chat"
                : bucketTheme === "Desert"
                ? "Desert-chat"
                : bucketTheme === "Royal"
                ? "Royal-chat"
                : bucketTheme === "Elegant"
                ? "Elegant-chat"
                : "Coffee-chat"
            }
          >
            <div className="message-details">
              <div
                className={
                  bucketTheme === "Navy"
                    ? "Navy-chat-box"
                    : bucketTheme === "Travel"
                    ? "Travel-chat-box"
                    : bucketTheme === "Rose"
                    ? "Rose-chat-box"
                    : bucketTheme === "Desert"
                    ? "Desert-chat-box"
                    : bucketTheme === "Royal"
                    ? "Royal-chat-box"
                    : bucketTheme === "Elegant"
                    ? "Elegant-chat-box"
                    : "Coffee-chat-box"
                }
              >
                {message.user_name}
              </div>
              <div
                className={
                  bucketTheme === "Navy"
                    ? "Navy-chat-box"
                    : bucketTheme === "Travel"
                    ? "Travel-chat-box"
                    : bucketTheme === "Rose"
                    ? "Rose-chat-box"
                    : bucketTheme === "Desert"
                    ? "Desert-chat-box"
                    : bucketTheme === "Royal"
                    ? "Royal-chat-box"
                    : bucketTheme === "Elegant"
                    ? "Elegant-chat-box"
                    : "Coffee-chat-box"
                }
              >
                {timeConvert(message.date_added)}
              </div>
            </div>
            <div
              className={
                bucketTheme === "Navy"
                  ? "Navy-chat-box full"
                  : bucketTheme === "Travel"
                  ? "Travel-chat-box full"
                  : bucketTheme === "Rose"
                  ? "Rose-chat-box full"
                  : bucketTheme === "Desert"
                  ? "Desert-chat-box full"
                  : bucketTheme === "Royal"
                  ? "Royal-chat-box full"
                  : bucketTheme === "Elegant"
                  ? "Elegant-chat-box full"
                  : "Coffee-chat-box full"
              }
            >
              {message.message}
            </div>
          </div>
        ))}
        <div id="anchor"></div>
      </div>
      <form onSubmit={submitChat}>
        <input
          type="text"
          placeholder="Message"
          className="form__input message__input"
          value={message}
          onChange={changeChat}
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
          send
        </button>
      </form>
    </div>
  );
}
