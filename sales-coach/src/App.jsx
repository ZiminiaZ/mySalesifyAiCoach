import React, { useState } from "react";
import axios from "axios";
import "./index.css";
// importing components
import ScoreInputs from "./components/ScoreInputs";
import RecommendationsAndCoaching from "./components/RecommendationsAndCoaching";
import Button from "./components/Button";

const App = () => {
  const [scores, setScores] = useState({ negotiation: 0, time_management: 0 });
  const [recommendations, setRecommendations] = useState(null);
  const [coachingTips, setCoachingTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(0);

  // gamification with levels out of 10
  const calculateLevel = () => {
    return Math.floor((scores.negotiation + scores.time_management)/2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScores({ ...scores, [name]: parseInt(value) });
  };

  const getRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("http://localhost:5000/recommend", {
        scores,
      });
      setRecommendations(response.data);
      setLevel(calculateLevel());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations.");
      setLoading(false);
    }
  };

  const getCoachingTips = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("http://localhost:5000/coach", {
        scores,
      });
      setCoachingTips(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coaching tips:", error);
      setError("Failed to fetch coaching tips.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-6  sm:gap-4 text-center p-4 text-white justify-center bg-black">
      <h1 className="text-4xl text-white font-bold sm:text-5xl md:text-6xl text-glow">
        AI-Powered Sales Coach
      </h1>

      {/* this block handles score inputs and the buttons */}
      <div className="space-y-4">
        <h2 className="text-4xl font-semibold sm:gap-4 text-center p-4 text-white justify-center sm:text-5xl md:text-6xl">
          <span className="rainbow-glow">Salesify</span> Your Scores
        </h2>
        {/* component for score inputs of negotiation and timemanagement */}
        <ScoreInputs scores={scores} handleInputChange={handleInputChange} />
        {/* component for buttons of negotiation and timemanagement */}
        <Button
          getRecommendations={getRecommendations}
          getCoachingTips={getCoachingTips}
        />
      </div>

      {/* this block handles the levelling system  */}
      <div className="space-x-4 flex justify-center py-2 text-xl font-semibold">
        <h3 className="font-bold text-xl">Level:</h3>
        <div>
          🏅 <span className="rainbow-glow">Level {level}</span>
        </div>
      </div>

      {/* this block shows "loading..." after button is clicked  */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Component for recommendation and coaching logic */}
      <RecommendationsAndCoaching
        recommendations={recommendations}
        coachingTips={coachingTips}
      />
    </div>
  );
};

export default App;
