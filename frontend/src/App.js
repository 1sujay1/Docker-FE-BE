import React, { useState, useEffect } from "react";

import GoalInput from "./components/goals/GoalInput";
import CourseGoals from "./components/goals/CourseGoals";
import ErrorAlert from "./components/UI/ErrorAlert";

const App = () => {
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost/goals");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message || "Fetching goals failed");
        }
        setLoadedGoals(resData.data);
      } catch (error) {
        setError(error.message || "Server failed fetching goals");
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  async function addGoalHandler(goalText) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/goals", {
        method: "POST",
        body: JSON.stringify({ text: goalText }),
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Adding Goal Failed");
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = [
          ...prevGoals,
          { id: resData.data.id, text: goalText },
        ];
        return updatedGoals;
      });
    } catch (error) {
      setError(error.message || "Server failed adding goals");
    }
    setIsLoading(false);
  }

  async function deleteGoalHandler(goalId) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/goals/" + goalId, {
        method: "DELETE",
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed Deleting Goal");
      }
      setLoadedGoals((prevGoals) => {
        const updatedGoal = prevGoals.filter((goal) => goal.id != goalId);
        return updatedGoal;
      });
    } catch (error) {
      setError(error.message || "Server failed deleting goals");
    }
    setIsLoading(false);
  }
  return (
    <div className="mainDiv">
      <h1>New Goal</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <GoalInput
          addGoalHandler={addGoalHandler}
          deleteGoalHandler={deleteGoalHandler}
          loadedGoals={loadedGoals}
        />
      )}

      {/* <CourseGoals /> */}
    </div>
  );
};
export default App;
