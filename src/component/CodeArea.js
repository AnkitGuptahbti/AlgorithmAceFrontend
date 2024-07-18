// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function CodeArea() {
//   const [code, setCode] = useState("");
//   const [input, setInput] = useState("");
//   const [language, setLanguage] = useState("java");
//   const [output, setOutput] = useState("");
//   const [cpuTime, setCpuTime] = useState("");
//   const [memory, setMemory] = useState("");
//   const [languageDetails, setLanguageDetails] = useState({});
//   const [testCases, setTestCases] = useState([]);
//   const [submissionStatus, setSubmissionStatus] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         // "https://algorithmacebackend.onrender.com/api/compiler/run",
//         "http://algorithmacebackend.onrender.com/api/compiler/run",
//         {
//           code: code,
//           language: language,
//           input: input,
//         }
//       );
//       const data = response.data;
//       setOutput(data.output);
//       setCpuTime(data.cpuTime);
//       setMemory(data.memory);
//       setLanguageDetails(data.language);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ////////////////////////////////

//   const fetchTestCases = async () => {
//       const { id } = useParams();
//     try {
//       const response = await axios.get(
//         `http://algorithmacebackend.onrender.com/api/testcases/${id}` // Replace with your API endpoint
//       );
//       setTestCases(response.data.testCases); // Assuming test cases are fetched as an array
//     } catch (error) {
//       console.error("Error fetching test cases:", error);
//     }
//   };

//   const handleSubmitSolution = async () => {
//     // Fetch test cases before submission
//     await fetchTestCases();

//     // Iterate through each test case and verify output
//     for (const testCase of testCases) {
//       try {
//         const response = await axios.post(
//           "http://algorithmacebackend.onrender.com/api/compiler/run",
//           {
//             code: code,
//             language: language,
//             input: testCase.input, // Use test case input
//           }
//         );
//         const data = response.data;

//         // Compare output with expected output
//         if (data.output.trim() === testCase.expectedOutput.trim()) {
//           // Test case passed
//           console.log(`Test case ${testCase.id}: Passed`);
//         } else {
//           // Test case failed
//           console.log(`Test case ${testCase.id}: Failed`);
//           setSubmissionStatus("Failed");
//           return; // Exit function early if any test case fails
//         }
//       } catch (error) {
//         console.error("Error running code:", error);
//         setSubmissionStatus("Failed");
//         return; // Exit function early on error
//       }
//     }

//     // If all test cases pass
//     setSubmissionStatus("Successful");
//   };

//   /////////////////////

//   return (
//     <div className="App">
//       {/* <form onSubmit={handleSubmit}> */}
//       <h3>Select Language:</h3>
//       <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//         <option value="java">Java</option>
//         <option value="cpp">C++</option>
//         <option value="python3">Python</option>
//         <option value="nodejs">Js</option>
//       </select>
//       <h3>Enter your code here:</h3>
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         placeholder="Enter your code here"
//         rows="10"
//         cols="50"
//       />

//       <h3>Enter input here (optional):</h3>
//       <textarea
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter input here"
//         rows="3"
//         cols="50"
//       />
//       <div></div>
//       <button onClick={handleSubmit}>Run Code</button>

//       <button onClick={handleSubmitSolution} style={{ marginLeft: "5px" }}>
//         Submit Solution
//       </button>

//       {/*  */}
//       <h3>Status On Submit Solution:</h3>
//       {submissionStatus && <p>{submissionStatus}</p>}
//       {/*  */}
//       {/* </form> */}
//       <h3>Output:</h3>
//       {output && (
//         <div>
//           <pre>{output}</pre>
//           <h3>Details:</h3>
//           <p>
//             <strong>CPU Time:</strong> {cpuTime}
//           </p>
//           <p>
//             <strong>Memory:</strong> {memory}
//           </p>
//           <p>
//             <strong>Language:</strong> {languageDetails.id} (Version:{" "}
//             {languageDetails.version_name})
//           </p>
//         </div>
//       )}
//       <h3>Status On Submit Solution:</h3>
//     </div>
//   );
// }

// export default CodeArea;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CodeArea() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [cpuTime, setCpuTime] = useState("");
  const [memory, setMemory] = useState("");
  const [languageDetails, setLanguageDetails] = useState({});
  const [testCases, setTestCases] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const { id } = useParams(); // Get the 'id' parameter from URL
  const [fialedTestcase, setFailedTestCase] = useState("");

  useEffect(() => {
    fetchTestCases();
  }, []); // Fetch test cases on component mount

  const fetchTestCases = async () => {
    try {
      const response = await axios.get(
        `http://algorithmacebackend.onrender.com/api/testcases/${id}`
      );
      // console.log("first")
      // console.log(response.data[0].testCases);
      // console.log("first")
      setTestCases(response.data[0].testCases); // Assuming test cases are fetched as an array
    } catch (error) {
      console.error("Error fetching test cases:", error);
    }
  };
  // /////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://algorithmacebackend.onrender.com/api/compiler/run",
        {
          code: code,
          language: language,
          input: input,
        }
      );
      const data = response.data;
      setOutput(data.output);
      setCpuTime(data.cpuTime);
      setMemory(data.memory);
      setLanguageDetails(data.language);
    } catch (error) {
      console.error(error);
    }
  };

  ///////////////////////////////////

  // console.log(testCases)
  const handleSubmitSolution = async () => {
    let combinedInput = testCases.length + "\n"; // Initialize a string to hold combined input

    // Construct combined input for all test cases
    for (const testCase of testCases) {
      combinedInput += `${testCase.input}\n`;
    }
    // console.log("first")
    // console.log(combinedInput)
    // console.log("first")

    try {
      const response = await axios.post(
        "http://algorithmacebackend.onrender.com/api/compiler/run",
        {
          code: code,
          language: language,
          input: combinedInput.trim(), // Trim to remove extra newline at the end
        }
      );
      const data = response.data;

      // Process response as needed (setOutput, setCpuTime, etc.)
      setOutput(data.output);
      setCpuTime(data.cpuTime);
      setMemory(data.memory);
      setLanguageDetails(data.language);

      //  console.log("first");
      //  console.log(data.output);//output
      //  console.log("first");

      // Split data.output into individual outputs based on newline (\n)
      const actualOutputs = data.output.trim().split("\n");

      // Assuming testCases array with expected outputs
      for (let i = 0; i < testCases.length; i++) {
        const expectedOutput = testCases[i].expectedOutput.trim();

        if (actualOutputs[i].trim() != testCases[i].expectedOutput.trim()) {
          setFailedTestCase(
            testCases[i].input +
              "\n" +
              "Expected Output:\n" +
              testCases[i].expectedOutput.trim() +
              "\n" +
              "Actual Output:\n" +
              actualOutputs[i].trim()
          );
          setSubmissionStatus("Failed");
          return;
        }
      }

      // If all test cases pass
      setSubmissionStatus("Successful");
    } catch (error) {
      console.error("Error running code:", error);
      setSubmissionStatus("Failed");
    }
  };

  return (
    <div className="App">
      <h3>Select Language:</h3>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="python3">Python</option>
        <option value="nodejs">Js</option>
      </select>
      <h3>Enter your code here:</h3>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here"
        rows="10"
        cols="50"
      />

      <h3>Enter input here (optional):</h3>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input here"
        rows="3"
        cols="50"
      />

      <button onClick={handleSubmit} style={{ marginLeft: "5px" }}>
        Run
      </button>
      <button onClick={handleSubmitSolution} style={{ marginLeft: "5px" }}>
        Submit Solution
      </button>

      <h3>Status On Submit Solution:</h3>
      {submissionStatus && <p>{submissionStatus}</p>}
      { submissionStatus=="Failed"&& fialedTestcase && <p> failedTestCase:{fialedTestcase}</p>}

      <h3>Output:</h3>
      {output && (
        <div>
          <pre>{output}</pre>
          <h3>Details:</h3>
          <p>
            <strong>CPU Time:</strong> {cpuTime}
          </p>
          <p>
            <strong>Memory:</strong> {memory}
          </p>
          <p>
            <strong>Language:</strong> {languageDetails.id} (Version:{" "}
            {languageDetails.version_name})
          </p>
        </div>
      )}
    </div>
  );
}

export default CodeArea;
