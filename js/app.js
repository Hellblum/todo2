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
			if (this.chosenElements.input.value.trim() !== "" && this.chosenElements.description.value.trim() !== "") {
				const task = ({
					title: this.chosenElements.input.value,
					description: this.chosenElements.description.value,
					completed: false,
				});
				await this.taskManager.addTask(task);
				this.taskRender.renderList();
				this.chosenElements.input.value = '';
				this.chosenElements.description.value = '';
			} else{
				alert ('Please enter a task!')
			}
		})
		this.eventFilters.filterTab();
	}
};
const app = new App();
app.init();