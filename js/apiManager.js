class ApiManager {
	constructor() {}
	async getAllTasks() {
		try{
			const res = await fetch('http://localhost:3000/todos');
			if (!res.ok) {
				throw new Error("responce not ok, getAllTasks")
			}
			return await res.json()
		} catch (error) {
			console.error(error.message)
		}
		
	};
	async addNewTask(task) {
		const res = await fetch('http://localhost:3000/todos', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-type': 'application/json',
			},
		});
		return await res.json();
	}
	async deleteNewTask(id) {
		try {
			if (!id) {
            throw new Error("ID is required to delete a task");
			}
			const res = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
			});
			return await res.json();
		} catch (err) {
			console.log({message: err})
		}
	}
	async patchNewTask(id, updates) {
		const res = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(updates),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		if (res.ok) {
			return await res.json();
		} else {
			const err = await res.json();
			console.error("Error updating task:", err.message);
		}
	}
}
