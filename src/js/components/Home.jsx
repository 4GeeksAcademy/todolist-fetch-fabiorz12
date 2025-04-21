import React, { useState, useEffect } from "react";



//create your first component
const TodoList = () => {
	const [task, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const userName = "fabio"
	const userId = "01"

	useEffect(() => {
		fetch(`https://playground.4geeks.com/todo/users/${userName}`)
			.then(res => {
				if (!res.ok) {
					createUser();
					return [];
				}
				return res.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					setTasks(data);
				}
			})
			.catch((error) => console.log("error al cargar la consola", error))
	}, []);
	const createUser = () => {
		fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				if (!res.ok) {
				throw new Error("Error al crear el usuario");
			}
				return res.json();
			})
			.then(() => {
				console.log("Usuario creado");
				setTasks([]);
			})
	 		.catch((error) => console.log("error al cargar la consola", error));
	};

const addTask = () => {
	if (newTask.trim() === "") return;

	const updatedTasks = [...task, { label: newTask, done: false }];

	fetch(`https://playground.4geeks.com/todo/todos/${userId}`, {
		method: "PUT",
		body: JSON.stringify(updatedTasks),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(data => {
			setTasks(updatedTasks);
			setNewTask("");
		})
		.catch((error) => console.log("error al cargar la consola", error))
};

const deleteTask = (index) => {
	const updatedTasks = task.filter((_, i) => i !== index);

	fetch(`https://playground.4geeks.com/todo/todos/${userId}`, {
		method: "PUT",
		body: JSON.stringify(updatedTasks),
		// headers: {
		// 	"Content-Type": "application/json"
		// }
	})
		.then(res => res.json())
		.then(data => {
			setTasks(updatedTasks);
		})
		.catch((error) => console.log("error al cargar la consola", error))
}

return (
	<div className="container">
		<h1>To Do list </h1>

		<div className="input-group my-3">
			<input type="text"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder="Agrega nueva tarea"
				className="form-control mb-2" />
			<button onClick={addTask}>Agregar tarea</button>
		</div>
		<ul className="list-group">
			{
				task.length === 0 ? (
					<li className="list-group-item">No hay tareas</li>
				) : (
					task.map((task, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
							<span>{task.label}</span>
							<button className="btn btn-danger" onClick={() => deleteTask(index)}>Eliminar</button>
						</li>
					))
				)
			}
		</ul>
	</div>

);
};

export default TodoList;