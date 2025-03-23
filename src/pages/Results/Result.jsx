import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Result.css";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // ✅ Success Icon

const Result = ({ name, setName,score, setScore }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  // ✅ Reset Score before redirecting to Homepage
  const handleGoHome = () => {
    setScore(0); // Reset score to 0
    setName("")
    navigate("/");
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <CheckCircleIcon className="success-icon" fontSize="32px" />
        <h2 className="result-title">Congratulations, {name}! 🎉</h2>
        <p className="score-text">Your Final Score: <strong>{score}</strong></p>

        <Button
          variant="contained"
          color="primary"
          size="large"
          className="home-btn"
          onClick={handleGoHome} // ✅ Calls function to reset score & go home
        > 
          🏠 Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Result;
