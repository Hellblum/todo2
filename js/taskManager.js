class TaskManager {
	constructor() {
		this.tasks = [];
		this.filter = 'all';
	};
	addTask(task) {
		this.tasks.push(task);
		this.logTasks();
	};
	removeTask(id) {
		this.tasks.splice(id, 1);
		this.logTasks();
	};
	toggleTaskCompletion(id) {
	this.tasks[id].toggleCompleted();
	this.logTasks();
	};
	setFilter(filter) {
		this.filter = filter;
	};
	getFilteredTasks() {
		if (this.filter === 'completed') {
			return this.tasks.filter(task => task.completed);
		} else if (this.filter === 'pending') {
			return this.tasks.filter(task => !task.completed);
		};
		return this.tasks; 
	};
	logTasks() {
		console.table(this.tasks);
	}
};