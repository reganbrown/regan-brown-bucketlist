import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import BucketDetails from "./pages/BucketDetails/BucketDetails";
import BucketEdit from "./pages/BucketEdit/BucketEdit";
import BucketAdd from "./pages/BucketAdd/BucketAdd";
import BucketExpenses from "./pages/BucketExpenses/BucketExpenses";
import BucketSavings from "./pages/BucketSavings/BucketSavings";
import BucketChat from "./pages/BucketChat/BucketChat";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/:bucketID" element={<BucketDetails />} />
        <Route path="/addbucket" element={<BucketAdd />} />
        <Route path="/:bucketID/edit" element={<BucketEdit />} />
        <Route path="/:bucketID/expenses" element={<BucketExpenses />} />
        <Route path="/:bucketID/savings" element={<BucketSavings />} />
        <Route path="/:bucketID/chat" element={<BucketChat />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
