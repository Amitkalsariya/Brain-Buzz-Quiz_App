import React, { useState } from "react";
import "./Home.css";
import { Button, MenuItem, TextField } from "@mui/material";
import Categories from "../../Data/Category";
import { useNavigate } from "react-router";
import ErrorMsg from "../../components/ErrorMessage/ErrorMsg";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name.trim()) {
      setError(true);
      return;
    } else {
      setError(false); // ✅ Reset error before API call
      fetchQuestions(category, difficulty);
      navigate("/quiz"); // ✅ Correct navigation
    }
  };

  return (
    <div className="home-container">
      <div className="content-row">
        {/* Left Side - Input Fields */}
        <div className="settings">
          <h1 className="title">🎯 Quiz Settings</h1>
          <div className="settings__select">
            {error && <ErrorMsg>Please Fill all the fields</ErrorMsg>}
            
            <TextField
              fullWidth
              label="Enter Your Name"
              variant="outlined"
              className="input-field"
              value={name || ""} // Ensure name is always a string
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              select
              label="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              className="input-field"
            >
              {Categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Select Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              variant="outlined"
              className="input-field"
            >
              <MenuItem value="easy">🟢 Easy</MenuItem>
              <MenuItem value="medium">🟡 Medium</MenuItem>
              <MenuItem value="hard">🔴 Hard</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="primary"
              size="large"
              className="start-btn"
              onClick={handleSubmit}
            >
              🚀 Start Quiz
            </Button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="banner-container">
          <img src="/g2.svg" className="banner" alt="quiz app" />
        </div>
      </div>
    </div>
  );
};

export default Home;
