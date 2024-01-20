import React, { useEffect, useState } from "react";
import "./Header.css";
import Task from "./Task";

const Home = () => {
  const initialA = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, settask] = useState(initialA);
  const [title, settitle] = useState("");
  const [descreption, setdiscription] = useState("");
  const submitH = (e) => {
    e.preventDefault();
    settask([...tasks, { title, descreption }]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    settitle("");
    setdiscription("");
  };

  const deleteTask = (index) => {
    const farray = tasks.filter((val, i) => {
      return i !== index;
    });
    settask(farray);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="contain">
      <h1>DAILY GOALS</h1>
      <form onSubmit={submitH}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={descreption}
          onChange={(e) => setdiscription(e.target.value)}></textarea>
        <button type="submit">ADD</button>
      </form>
      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          discription={item.descreption}
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
