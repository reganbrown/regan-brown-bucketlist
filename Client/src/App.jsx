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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:userID" element={<BucketList />} />
        <Route path="/bucketdetails/:bucketID" element={<BucketDetails />} />
        <Route path="/addbucket" element={<BucketAdd />} />
        <Route path="/editbucket/:bucketID" element={<BucketEdit />} />
        <Route path="/expenses/:bucketID" element={<BucketExpenses />} />
        <Route path="/savings/:bucketID" element={<BucketSavings />} />
        <Route path="/chat/:bucketID" element={<BucketChat />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
