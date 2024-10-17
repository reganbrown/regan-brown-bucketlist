import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BucketExpenses() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let { bucketID } = useParams();
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async () => {
    let results = await axios.get(`${backendUrl}/bucket/${bucketID}/expenses`);
    setExpenses(results.data);
  };

  useEffect(() => {
    getExpenses();
  }, [bucketID]);
  return (
    <>
      <h1>Bucket Expenses</h1>
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-list">
          <p>{expense.expense_name}</p>
          <p>{expense.amount}</p>
          <p>{expense.notes}</p>
        </div>
      ))}
    </>
  );
}
