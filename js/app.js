class App {
	constructor () {
		this.chosenElements = new ChosenElements();
		this.apiManager = new ApiManager();
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender(this.taskManager, this.taskList);
		this.eventFilters = new EventFilters(this.chosenElements, this.taskRender);
	}
	async init () {
		await this.taskManager.tasksLoader();
		this.taskRender.renderList();

		this.chosenElements.inputBtn.addEventListener('click', async () => {
			if (this.chosenElements.input.value.trim() !== "") {
				const task = new Task ({
					id: Math.random(),
					title: this.chosenElements.input.value,
					completed: false,
				});

				await this.taskManager.addTask(task);
				this.taskRender.renderList();
				this.chosenElements.input.value = '';

			} else{
				alert ('Please enter a task!')
			}
		})
		// const eventFilters = new EventFilters(chosenElements, taskRender);
		this.eventFilters.filterTab();
		// this.chosenElements.allTab.addEventListener('click', () => 
		// 	this.taskRender.handleFilter('all')
		// );
		// this.chosenElements.currentTab.addEventListener('click', () =>
		// 	this.taskRender.handleFilter('pending')
		// );
		// this.chosenElements.completedTab.addEventListener('click', () => 
		// 	this.taskRender.handleFilter('completed')
		// );
	}
};
const app = new App();
app.init();