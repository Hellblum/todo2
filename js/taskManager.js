class TaskManager {
	constructor(tasks) {
		this.apiManager = new ApiManager();
		this.tasks = tasks || [];
		this.filter = 'all';
	}
	async tasksLoader() {
		try {
		const tasks = await this.apiManager.getAllTasks();
		this.tasks = tasks.map(task => {
		const { id: taskId, title: taskTitle, description: taskDescription, completed } = task;
		return {
			id: taskId,
			title: taskTitle,
			description: taskDescription,
			completed,
			}
		});
		} catch (error) {
		console.error("Помилка завантаження тасків:", error);
		}
		this.logTasks();
	}
	async addTask(task) {
		try {
			const newTask = await this.apiManager.addNewTask(task);
			this.tasks.push(newTask);
			this.logTasks();
		} catch (error) {
			console.error("Помилка додавання тудухи:", error);
		}
	}
	async removeTask(id) {
		try {
			await this.apiManager.deleteNewTask(id);
			this.tasks = this.tasks.filter(task => task.id !== id);
			this.logTasks();
		} catch (error) {
			console.error("Помилка видалення тудухи:", error);
		}
	}
	// async toggleTaskCompletion(id) {
	// 	try {
	// 		const task = this.tasks.find(task => task.id === id);
	// 		if (task) {
	// 			const updatedTask = await this.apiManager.patchNewTask(id, !task.completed);
	// 			task.completed = updatedTask.completed;
	// 		}
	// 		this.logTasks();
	// 	} catch (error) {
	// 		console.error("Помилка перемикача тудухи:", error);
	// 	}
	// }
	async updateTask(id, title, description, completed) {
		try {
			const task = this.tasks.find(task => task.id === id);
			if(task) {
				const updatedTask = await this.apiManager.patchNewTask(id, { title, description, completed });
				if(updatedTask) {
					task.title = updatedTask.title;
					task.description = updatedTask.description;
					task.completed = updatedTask.completed;
				} else {
               console.log(`Не вдалося оновити задачу з ID ${id}.`);
				}
			} else {
            console.log(`Задачу з ID ${id} не знайдено.`);
			}
			this.logTasks();
		} catch (error) {
			console.error("Помилка оновлення тудухи:", error);
		}
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