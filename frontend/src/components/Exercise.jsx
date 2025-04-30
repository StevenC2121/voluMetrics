import React from "react";
import "../styles/Exercise.css"

function Exercise({ exercise, onDelete }) {
  const formattedDate = new Date(exercise.performed_at).toLocaleDateString(
    "en-us"
  );

  return (
    <div className="exercise-container">
      <p className="exercise-name">{exercise.name}</p>
      <p className="exercise-weight">Weight: {exercise.weight}</p>
      <p className="exercise-reps">Reps: {exercise.reps}</p>
      <p className="exercise-date">Date: {formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(exercise.id)}>
        Delete
      </button>
    </div>
  );
}

export default Exercise