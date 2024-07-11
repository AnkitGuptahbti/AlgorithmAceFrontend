
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsList from "./component/QuestionsList";
import QuestionDetail from "./component/QuestionDetailPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<QuestionsList />} />
          <Route exact path="/question/:id" element={< QuestionDetail/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
