// app/page.js
"use client";

import { useState } from "react";
import styles from "./styles.css";

export default function Home() {
  const [inputJson, setInputJson] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const res = await fetch("/api/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedJson),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data);
      setError("");
    } catch (e) {
      setError("Invalid JSON input or network error");
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOptions(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const selectedData = {
      numbers: selectedOptions.includes("numbers") ? numbers : [],
      alphabets: selectedOptions.includes("alphabets") ? alphabets : [],
      highest_alphabet: selectedOptions.includes("highest_alphabet")
        ? highest_alphabet
        : [],
    };

    return (
      <div>
        <h3>Response</h3>
        {selectedData.numbers.length > 0 && (
          <p>Numbers: {selectedData.numbers.join(", ")}</p>
        )}
        {selectedData.alphabets.length > 0 && (
          <p>Alphabets: {selectedData.alphabets.join(", ")}</p>
        )}
        {selectedData.highest_alphabet.length > 0 && (
          <p>Highest Alphabet: {selectedData.highest_alphabet.join(", ")}</p>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1>Assignment</h1>
      <textarea
        value={inputJson}
        onChange={(e) => setInputJson(e.target.value)}
        placeholder="Enter JSON data here..."
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className={styles.error}>{error}</p>}
      <select multiple onChange={handleOptionChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highest_alphabet">Highest Alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}
