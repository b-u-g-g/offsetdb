import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AllCredits from "./pages/AllCredits.jsx";


function TopBar() {
  const { pathname } = useLocation();

  return (
    <div className="header-top">
      <div
        style={{
          maxWidth: 1200,              
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: 16,
        }}
      >
        

     
     
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credits" element={<AllCredits />} />
      </Routes>
    </BrowserRouter>
  );
}
