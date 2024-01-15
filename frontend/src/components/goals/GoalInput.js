import React, { useState } from "react";

export default function GoalInput({
  addGoalHandler,
  deleteGoalHandler,
  loadedGoals,
}) {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Goal text here..."
        value={text}
        className="inputBox"
      />
      <button className="addGoalBtn" onClick={() => addGoalHandler(text)}>
        ADD GOAL
      </button>

      {loadedGoals.length ? (
        loadedGoals.map((goal) => {
          return (
            <div>
              <div>
                <button
                  className="deleteGoalBtn"
                  onClick={() => deleteGoalHandler(goal.id)}
                >
                  {goal.text}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No Goals Found, Start adding some</h2>
      )}
    </div>
  );
}
