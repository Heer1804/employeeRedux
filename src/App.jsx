import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import View from "./components/View";
import Header from "./components/Header";
import Update from "./components/Update";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/" element={<View />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
