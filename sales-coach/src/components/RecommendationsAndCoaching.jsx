import React from "react";

function RecommendationsAndCoaching({recommendations, coachingTips}) {
  return (
    <div>
      {recommendations && (
        <div>
          <h2 className="font-bold text-xl text-glow">Recommendations</h2>
          <ul>
            {Object.keys(recommendations).map((key) => (
              <li key={key}>
                <strong>{key}:</strong> {recommendations[key]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {coachingTips && (
        <div>
          <h2 className="font-bold text-xl text-glow">Coaching Tips</h2>
          <ul>
            {Object.entries(coachingTips).map(([skill, tip]) => (
              <li key={skill}>
                <strong>{skill}:</strong> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendationsAndCoaching;
