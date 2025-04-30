import React from "react";

function Exercise({ exercise, onDelete }) {
  const formattedDate = new Date(exercise.created_at).toLocaleDateString(
    "en-us"
  );

  return (
    <div className="exercise-container">
      <p className="exercise-name">{exercise.name}</p>
      <p className="exercise-weight">{exercise.weight}</p>
      <p className="exercise-reps">{exercise.reps}</p>
      <p className="exercise-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(exercise.id)}>
        Delete
      </button>
    </div>
  );
}

export default Exercise