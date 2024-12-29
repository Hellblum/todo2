class App {
	constructor () {
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender(this.taskManager, taskList);
		this.getData = new GetData();
	};
	async init () {
		const tasks = await this.getData.fetchData();
		tasks.map( data => {
			const task = new Task(data.title);
			task.completed = data.completed;
			this.taskManager.addTask(task);
			this.taskRender.renderList();
		});
		inputBtn.addEventListener('click', () => {
			if (input.value.trim() !== "") {
				const task = new Task(input.value);
				this.taskManager.addTask(task);
				this.taskRender.renderList();
				input.value = '';
			} else{
				alert ('Please enter a task!')
			}
		});
		allTab.addEventListener('click', () => this.taskRender.handleFilter('all'));
		currentTab.addEventListener('click', () => this.taskRender.handleFilter('pending'));
		completedTab.addEventListener('click', () => this.taskRender.handleFilter('completed'));
	};
};
const app = new App();
app.init();