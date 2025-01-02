class ApiManager {
	constructor() {}
	async getAllTasks() {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos');
		return await res.json();
	};
	async addNewTask(task) {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-type': 'application/json',
			},
		});
		return await res.json();
	}
};

