import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const backendUrl = "https://your-backend-url.vercel.app/bfhl"; // Replace with your actual backend URL

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      const res = await axios.post(backendUrl, jsonInput);
      setResponse(res.data);
    } catch (error) {
      console.error("Invalid JSON input or API error", error);
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div>
      <h1>{response?.roll_number}</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleOptionChange}
            />
            Highest Alphabet
          </label>

          <div>
            {selectedOptions.includes("alphabets") && (
              <p>Alphabets: {response.alphabets.join(", ")}</p>
            )}
            {selectedOptions.includes("numbers") && (
              <p>Numbers: {response.numbers.join(", ")}</p>
            )}
            {selectedOptions.includes("highest_alphabet") && (
              <p>Highest Alphabet: {response.highest_alphabet.join(", ")}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
