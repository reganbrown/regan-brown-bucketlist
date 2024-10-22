import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import deleteButton from "../../assets/delete.svg";
import axios from "axios";

export default function BucketExpenses() {
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let { bucketID } = useParams();
  const [bucketTheme, setBucketTheme] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseNotes, setExpenseNotes] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/account");
    }
  }, [navigate]);

  const getExpenses = async () => {
    let results = await axios.get(`${backendUrl}/bucket/${bucketID}/expenses`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    setExpenses(results.data);
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
      navigate("/account");
    }
  };

  useEffect(() => {
    getBucket();
    getExpenses();
  }, [bucketID]);

  const addExpense = async () => {
    let newExpense = {
      expense_name: expenseName,
      amount: expenseAmount,
      notes: expenseNotes,
    };
    let results = await axios.post(
      `${backendUrl}/bucket/${bucketID}/expenses`,
      newExpense,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    getExpenses();
  };

  function changeName(event) {
    setExpenseName(event.target.value);
  }

  function changeAmount(event) {
    setExpenseAmount(event.target.value);
  }

  function changeNotes(event) {
    setExpenseNotes(event.target.value);
  }

  function submitExpense(event) {
    event.preventDefault();
    addExpense();
    setExpenseAmount("");
    setExpenseName("");
    setExpenseNotes("");
  }

  async function deleteExpense(expenseID) {
    try {
      await axios.delete(
        `${backendUrl}/bucket/${bucketID}/expenses/${expenseID}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      getExpenses();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExpenses();
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
      <h1>Bucket Expenses</h1>
      {expenses.map((expense) => (
        <div key={expense.id} className="finance-list">
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
            {expense.expense_name}
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
            {expense.amount}
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
            {expense.notes}
          </div>
          <button
            type="button"
            onClick={() => {
              deleteExpense(expense.id);
            }}
            className={
              bucketTheme === "Navy"
                ? "finance-delete-button Navy-page"
                : bucketTheme === "Travel"
                ? "finance-delete-button Travel-page"
                : bucketTheme === "Rose"
                ? "finance-delete-button Rose-page"
                : bucketTheme === "Desert"
                ? "finance-delete-button Desert-page"
                : bucketTheme === "Royal"
                ? "finance-delete-button Royal-page"
                : bucketTheme === "Elegant"
                ? "finance-delete-button Elegant-page"
                : "finance-delete-button Coffee-page"
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
      <form onSubmit={submitExpense}>
        <input
          type="text"
          placeholder="Expense Name"
          className="form__input"
          value={expenseName}
          onChange={changeName}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Expense Amount"
          className="form__input"
          value={expenseAmount}
          onChange={changeAmount}
        />
        <input
          type="text"
          placeholder="Expense Notes"
          className="form__input"
          value={expenseNotes}
          onChange={changeNotes}
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
