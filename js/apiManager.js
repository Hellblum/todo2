class ApiManager {
	constructor() {}
	async getAllTasks() {
		try{
			const res = await fetch('https://jsonplaceholder.typicode.com/user/1/todos');
			if (!res.ok) {
				throw new Error("responce not ok, getAllTasks")
			}
			return await res.json()
		} catch (error) {
			console.error(error.message)
		}
		
	};
	async addNewTask(task) {
		const res = await fetch('https://jsonplaceholder.typicode.com/user/1/todos', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-type': 'application/json',
			},
		});
		const data = await res.json();
		data.id = Math.random();
		return data;
	}
	async deleteNewTask(id) {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		});
		return await res.json();
	}
	async patchNewTask(id, updateCompleted) {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({completed: updateCompleted}),
			headers: {
				'Content-type': 'application/json',
			},
		});
		return await res.json();
	}
};