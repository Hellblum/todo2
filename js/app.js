class App {
	constructor () {
		this.apiManager = new ApiManager();
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender(this.taskManager, taskList);
	}
	async init () {
		const tasks = await this.apiManager.getAllTasks();
		tasks.map( data => {
			const task = new Task(data.title);
			task.completed = data.completed;
			task.id = data.id;
			this.taskManager.addNewTask(task);
		})
		this.taskRender.renderList();
		inputBtn.addEventListener('click', async () => {
			// const result = await this.apiManager.addNewTask();
			// if (result) {
				if (input.value.trim() !== "") {
					const task = new Task(input.value);
					this.taskManager.addNewTask(task);
					this.taskRender.renderList();
					input.value = '';
				} else{
					alert ('Please enter a task!')
				}
			// }
		})
		allTab.addEventListener('click', () => this.taskRender.handleFilter('all'));
		currentTab.addEventListener('click', () => this.taskRender.handleFilter('pending'));
		completedTab.addEventListener('click', () => this.taskRender.handleFilter('completed'));
	}
};
const app = new App();
app.init();