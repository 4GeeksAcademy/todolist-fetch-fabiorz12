import React, { useState, useEffect } from "react";



//create your first component
const TodoList = () => {
	const [task,setTasks] = useState([]);
	const [newTask, setNewTask] = ("");

	const userName = "Fabio"

	useEffect(()=>{
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${userName}`)
		.then( res => res.json())
		.then(data =>{setTasks(data)})
		.catch((error) => console.log("error al cargar la consola",error))
	},[]);

	const addTask = () => {
		if (newTask.trim() === "") return;

		const updatedTasks = [...task, {label: newTask, done: false}];

		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${userName}`,{
			method: "PUT",
			body: JSON.stringify(updatedTasks),
			headers:{
				"content-Type": "application/json"
			}
		})
	}

	return (
		<div className="container">
			<h1>to Do list </h1>
			<input value={newTask} onChange={(e)=> setNewTask(e.target.value)} placeholder="Agrega nueva tarea" />
			<button onClick={addTask}></button>
		</div>
		
	);
};

export default TodoList;