import React from "react";

function ScoreInputs({ scores, handleInputChange }) {
  return (
    <>
      <label className="p-2 text-xl">
        <div>
          Negotiation:
          <input
            className="p-3 ml-9 gap-2 rounded-full text-black hover:bg-black text-center font-extrabold hover:text-white duration-300"
            type="number"
            name="negotiation"
            placeholder="score"
            value={scores.negotiation}
            onChange={handleInputChange}
            min="0"
            max="10"
          />
        </div>
      </label>
      <br />
      <label className="text-xl">
        Time Management:
        <input
          className="p-3 ml-4 rounded-full hover:bg-black text-black hover:text-white text-center font-extrabold duration-300"
          type="number"
          name="time_management"
          value={scores.time_management}
          onChange={handleInputChange}
          min="0"
          max="10"
        />
      </label>
      <br />
    </>
  );
}

export default ScoreInputs;
