import { useState, useEffect } from "react";
import api from "../api";
import Exercise from "../components/Exercise";

function Home() {
  const [exercises, setExercises] = useState([]);
  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = () => {
    api
      .get("/api/exercises/")
      .then((res) => res.data)
      .then((data) => {
        setExercises(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteExercise = (id) => {
    api
      .delete(`/api/exercises/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Exercise deleted!");
        else alert("Failed to delete exercise.");
        getExercises();
      })
      .catch((error) => alert(error));
  };

  const createExercise = (e) => {
    e.preventDefault();
    api
      .post("/api/exercises/", { weight, reps, name })
      .then((res) => {
        if (res.status === 201) alert("Exercise created!");
        else alert("Failed to create exercise.");
        getExercises();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Exercises</h2>
        {exercises.map((exercise) => (
          <Exercise
            exercise={exercise}
            onDelete={deleteExercise}
            key={exercise.id}
          />
        ))}
      </div>
      <h2>Log a Lift</h2>
      <form onSubmit={createExercise}>
        <label htmlFor="name">Exercise Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="weight">Weight (lbs):</label>
        <br />
        <input
          type="number"
          id="weight"
          name="weight"
          step="0.1"
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          value={weight ?? ""}
          required
        />

        <label htmlFor="reps">Reps:</label>
        <br />
        <input
          type="number"
          id="reps"
          name="reps"
          min="1"
          step="1"
          onChange={(e) => setReps(parseInt(e.target.value))}
          value={reps ?? ""}
          required
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
