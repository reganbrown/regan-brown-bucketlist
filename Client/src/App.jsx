import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import BucketList from "./pages/BucketList/BucketList";
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
        <Route path="/bucketlist" element={<BucketList />} />
        <Route path="/bucketlist/:bucketID" element={<BucketDetails />} />
        <Route path="/bucketlist/addbucket" element={<BucketAdd />} />
        <Route path="/bucketlist/:bucketID/edit" element={<BucketEdit />} />
        <Route
          path="/bucketlist/:bucketID/expenses"
          element={<BucketExpenses />}
        />
        <Route
          path="/bucketlist/:bucketID/savings"
          element={<BucketSavings />}
        />
        <Route path="/bucketlist/:bucketID/chat" element={<BucketChat />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
