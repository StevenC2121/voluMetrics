import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import api from "../api";

function ProgressTracker() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [metric, setMetric] = useState("weight");

  useEffect(() => {
    api
      .get("/api/exercises/")
      .then((res) => res.data)
      .then((data) => {
        console.log("Raw exercise data:", data);
        setExercises(data);
        if (data.length > 0) setSelectedExercise(data[0].name);
      })
      .catch((err) => alert("Failed to load data: " + err));
  }, []);

  const exerciseNames = [...new Set(exercises.map((e) => e.name))];

  const formattedData = exercises
    .filter((e) => e.name === selectedExercise)
    .sort((a, b) => new Date(a.performed_at) - new Date(b.performed_at))
    .map((e) => ({
      date: new Date(e.performed_at).toLocaleDateString(),
      weight: e.weight,
      reps: e.reps,
    }));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Progress Tracker</h2>

      <label htmlFor="exercise">Exercise: </label>
      <select
        id="exercise"
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        {exerciseNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="metric" style={{ marginLeft: "1rem" }}>
        Metric:
      </label>
      <select
        id="metric"
        value={metric}
        onChange={(e) => setMetric(e.target.value)}
      >
        <option value="weight">Weight</option>
        <option value="reps">Reps</option>
      </select>

      <LineChart
        width={700}
        height={400}
        data={formattedData}
        margin={{ top: 30, right: 30, bottom: 5, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={metric}
          stroke="#82ca9d"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </div>
  );
}

export default ProgressTracker;
