import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsList from "./component/QuestionsList";
import QuestionDetail from "./component/QuestionDetailPage";
import HomePage from "./component/HomePage";
import Register from "./component/Register";
import Login from "./component/Login";
import Navbar from "./component/Navbar";

const App = () => {

  return (
    <>
      <Router>
        <Navbar/> 
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/questions" element={<QuestionsList />} />
          <Route exact path="/question/:id" element={<QuestionDetail />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
