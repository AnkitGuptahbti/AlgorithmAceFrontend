import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://algorithmacebackend.onrender.com/api/questions"
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Questions List</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {questions.map((question) => (
          <li key={question._id} style={{ marginBottom: "10px" }}>
            <Link
              to={`/question/${question._id}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              {question.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
