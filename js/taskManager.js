class TaskManager {
	constructor() {
		this.tasks = [];
		this.filter = 'all';
		this.api = new ApiService()
	}

	async loadTasks() {
		try {
			const tasks = await this.api.fetchData();
			this.tasks = tasks.map(({ id,title,completed } )=> ({
				id,
				title,
				completed,
			}));
		} catch (error) {
			console.error("Помилка завантаження тасків:", error);
		}
	}

	addTask(task) {
		this.tasks.unshift(task);
	}

	removeTask(id) {
		this.tasks = this.tasks.filter(task => task.id !== id);
		this.logTasks();
	}

	toggleTaskCompletion(id) {
		const task = this.tasks.find(task => task.id === id);
		if (task) {
			task.completed = !task.completed;
		}
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
		}
		return this.tasks;
	}

	logTasks() {
		console.table(this.tasks);
	}
}
