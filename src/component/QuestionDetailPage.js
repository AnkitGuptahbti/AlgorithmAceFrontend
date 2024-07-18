import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeArea from "./CodeArea";

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://algorithmacebackend.onrender.com/api/questions/${id}`
        );
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  // Concatenate test case inputs into a single string
  const testCaseInputs = question.testCases
    .map((testCase) => testCase.input)
    .join("\n");

  return (
    <div style={{ padding: "20px", display: "flex" ,backgroundColor:""}}>
      <div>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <p>
          InputFormat:
          <br />
          {question.inputFormat}
        </p>
        <p>
          OutpurFormat:
          <br />
          {question.outputFormat}
        </p>
        <div style={{ border: "1px solid pink", width: "80%" }}>
          <p>
            <strong>Input:</strong> <br /> <p>{question.testCases.length}</p>
            <textarea
              value={testCaseInputs}
              readOnly
              style={{ width: "95%", height: "100px" }}
            />
          </p>
        </div>
        <div style={{ border: "1px solid pink", width: "60%" }}>
          {" "}
          <p>
            <strong>Output:</strong> <br />
            <textarea
              value={question.testCases
                .map((testCase) => testCase.expectedOutput)
                .join("\n")}
              readOnly
              style={{ width: "95%", height: "100px" }}
            />
          </p>
        </div>

        <p>
          <strong>Difficulty:</strong> {question.difficulty}
        </p>
        <p>
          <strong>Tags:</strong> {question.tags.join(", ")}
        </p>
      </div>
      <div
        style={{
          marginLeft: "5px",
          border: "2px solid grey",
          width: "60% ",
          paddingLeft: "8px",
        }}
      >
        <CodeArea />
      </div>
    </div>
  );
};

export default QuestionDetailPage;
