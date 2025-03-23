import React, { useState } from "react";
import "./Question.css";
import { useNavigate } from "react-router";
import ErrorMsg from "../ErrorMessage/ErrorMsg";
import { Button, CircularProgress } from "@mui/material"; // ✅ Import CircularProgress

const Question = ({
  currQue,
  setCurrQue,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  setName, // ✅ Add setName to clear name
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  // Handles selecting an answer
  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  // Handles next question logic
  const handleNext = () => {
    if (currQue > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrQue(currQue + 1);
      setSelected();
    } else {
      setError("Please select an option first");
    }
  };

  // Handles Quit with Loading Effect
  const handleQuit = () => {
    setLoading(true); // ✅ Show loading effect

    setTimeout(() => {
      setCurrQue(0);
      setQuestions([]);
      setName(""); // ✅ Clear user's name
      localStorage.removeItem("name"); // ✅ Remove name from localStorage (if used)
      navigate("/"); // ✅ Redirect to Home Page after delay
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="question">
      <h1>Question {currQue + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions && questions[currQue] ? questions[currQue].question : "Loading Question..."}</h2>

        <div className="options">
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected || loading} // ✅ Disable if quitting
              >
                {i}
              </button>
            ))}
        </div>

        {/* Buttons */}
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className="quit-btn"
            onClick={handleQuit}
            disabled={loading} // ✅ Disable when quitting
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Quit"} {/* ✅ Show loading spinner */}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="next-btn"
            onClick={handleNext}
            disabled={loading} // ✅ Disable when quitting
          >
            {currQue > 8 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
