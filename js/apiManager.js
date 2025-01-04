class ApiManager {
	constructor() {}
	async getAllTasks() {
		const res = await fetch('https://jsonplaceholder.typicode.com/user/1/todos');
		return await res.json();
	};
	async addNewTask(task) {
		const res = await fetch('https://jsonplaceholder.typicode.com/user/1/todos', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-type': 'application/json',
			},
		});
		return await res.json();
	}
	async deleteNewTask(id) {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		});
		return await res.json();
	}
};