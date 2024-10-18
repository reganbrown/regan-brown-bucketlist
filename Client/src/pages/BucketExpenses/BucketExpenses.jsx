import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import deleteButton from "../../assets/delete.svg";
import axios from "axios";
import "./BucketExpenses.scss";

export default function BucketExpenses() {
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let { bucketID } = useParams();
  const [bucketTheme, setBucketTheme] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseNotes, setExpenseNotes] = useState("");

  const getExpenses = async () => {
    let results = await axios.get(`${backendUrl}/bucket/${bucketID}/expenses`);
    setExpenses(results.data);
  };

  const getBucket = async () => {
    try {
      let results = await axios.get(`${backendUrl}/bucket/${bucketID}`);
      setBucketTheme(results.data.bucket.theme_name);
    } catch (error) {
      navigate("/404");
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
      newExpense
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
  }

  async function deleteExpense(expenseID) {
    try {
      await axios.delete(
        `${backendUrl}/bucket/${bucketID}/expenses/${expenseID}`
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
      <h1>Bucket Expenses</h1>
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-list">
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-expense-box"
                : bucketTheme === "Travel"
                ? "travel-expense-box"
                : bucketTheme === "Rose"
                ? "rose-expense-box"
                : bucketTheme === "Grink"
                ? "grink-expense-box"
                : bucketTheme === "Royal"
                ? "royal-expense-box"
                : bucketTheme === "Elegant"
                ? "elegant-expense-box"
                : "coffee-expense-box"
            }
          >
            {expense.expense_name}
          </div>
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-expense-box"
                : bucketTheme === "Travel"
                ? "travel-expense-box"
                : bucketTheme === "Rose"
                ? "rose-expense-box"
                : bucketTheme === "Grink"
                ? "grink-expense-box"
                : bucketTheme === "Royal"
                ? "royal-expense-box"
                : bucketTheme === "Elegant"
                ? "elegant-expense-box"
                : "coffee-expense-box"
            }
          >
            {expense.amount}
          </div>
          <div
            className={
              bucketTheme === "Adventure"
                ? "adventure-expense-box"
                : bucketTheme === "Travel"
                ? "travel-expense-box"
                : bucketTheme === "Rose"
                ? "rose-expense-box"
                : bucketTheme === "Grink"
                ? "grink-expense-box"
                : bucketTheme === "Royal"
                ? "royal-expense-box"
                : bucketTheme === "Elegant"
                ? "elegant-expense-box"
                : "coffee-expense-box"
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
      <form onSubmit={submitExpense}>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={changeName}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={changeAmount}
        />
        <input
          type="text"
          placeholder="Expense Notes"
          value={expenseNotes}
          onChange={changeNotes}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
