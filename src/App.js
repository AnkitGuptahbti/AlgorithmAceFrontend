import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [cpuTime, setCpuTime] = useState("");
  const [memory, setMemory] = useState("");
  const [languageDetails, setLanguageDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://algorithmacebackend.onrender.com/api/compiler/run",
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

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Enter your code here:</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
          rows="10"
          cols="50"
        />
        <h3>Select Language:</h3>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python3">Python</option>
          <option value="nodejs">Js</option>
        </select>
        <h3>Enter input here (optional):</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here"
          rows="3"
          cols="50"
        />
        <button type="submit">Run Code</button>
      </form>
      {output && (
        <div>
          <h3>Output:</h3>
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

export default App;
