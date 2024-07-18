import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiDownArrowAlt } from "react-icons/bi";

const QuestionsList = () => {
  const [questions, setQuestions] = useState(null);
  // "https://algorithmacebackend.onrender.com/api/questions"

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://algorithmacebackend.onrender.com/api/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: "20px"}}>
      <h1>
        Questions List:
        <br />
        <BiDownArrowAlt />
      </h1>
      {questions ? (
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
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default QuestionsList;
