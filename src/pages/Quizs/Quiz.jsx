import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Quiz.css";
import Question from "../../components/Question/Question";

const Quiz = ({ name, setName,score, questions, setQuestions, setScore }) => {
  const [options, setOptions] = useState([]);
  const [currQue, setCurrQue] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Redirect to home if name is empty
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setLoading(false);
      setOptions(
        handleShuffle([
          questions[currQue].correct_answer,
          ...questions[currQue].incorrect_answers,
        ])
      );
    }
  }, [questions, currQue]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <div className="quiz-container">
        <span className="subtitle">Welcome, {name} 🎉</span>

        {loading ? (
          <div className="loading-container">
            <CircularProgress className="loading-spinner" size={80} thickness={2} />
            <p className="loading-text">Loading questions...</p>
          </div>
        ) : (
          <>
            <div className="quizInfo">
              <span>📚 {questions[currQue]?.category}</span>
              <span>🏆 Score: {score}</span>
            </div>

            <Question
              currQue={currQue}
              setCurrQue={setCurrQue}
              questions={questions}
              options={options}
              correct={questions[currQue]?.correct_answer}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              setName={setName}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
