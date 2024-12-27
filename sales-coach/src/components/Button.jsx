import React from "react";

function Button({ getRecommendations, getCoachingTips }) {
  return (
    <div className="space-x-4 flex justify-center">
      <button
        onClick={getRecommendations}
        className="text-slate-400 hover:bg-pink-400 rounded-full hover:text-white hover:-translate-y-2 duration-300 p-3 flex items-center gap-2 group px-4 py-2 animate-pulse shadow-lg shadow-pink-500/50 hover:shadow-pink-700"
      >
        Get Recommendations
      </button>
      <button
        onClick={getCoachingTips}
        className="text-slate-400 hover:bg-green-400 rounded-full hover:text-white hover:-translate-y-2 duration-300 p-3 flex items-center gap-2 group px-4 py-2 animate-pulse shadow-lg shadow-green-500/50 hover:shadow-green-700"
      >
        Get Coaching Tips
      </button>
    </div>
  );
}

export default Button;
