class TaskManager {
	constructor(tasks) {
		this.tasks = tasks || [];
		this.filter = 'all';
		this.apiManager = new ApiManager();
	}
	// async tasksFromApi() {
	// 	const apiTasks = await this.apiManager.getAllTasks();
	// 	return apiTasks;
	// }
	async addNewTask(task) {
		const newTask = await this.apiManager.addNewTask(task);
		newTask && this.tasks.push(newTask);
		this.logTasks();
	}
	// addTask(task) {
	// 	this.tasks.push(task);
	// 	this.logTasks();
	// };
	removeTask(id) {
		this.tasks.splice(id, 1);
		this.logTasks();
	}
	toggleTaskCompletion(id) {
		this.tasks[id].toggleCompleted();
		this.logTasks();
	}
	setFilter(filter) {
		this.filter = filter;
	}
	getFilteredTasks() {
		if (this.filter === 'completed') {
			return this.tasks.filter(task => task.completed);
		} else if (this.filter === 'pending') {
			return this.tasks.filter(task => !task.completed);
		};
		return this.tasks; 
	}
	logTasks() {
		console.table(this.tasks);
	}
};