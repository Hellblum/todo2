class App {
	constructor () {
		this.chosenElements = new ChosenElements();
		this.apiManager = new ApiManager();
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender(this.taskManager, this.taskList);
		this.eventFilters = new EventFilters(this.chosenElements, this.taskRender);
	}

	async init () {
		this.chosenElements.input.focus();
		await this.taskManager.tasksLoader();
		this.taskRender.renderList();

		this.chosenElements.inputBtn.addEventListener('click', async () => {
			if (this.chosenElements.input.value.trim() !== "") {
				const task = ({
					title: this.chosenElements.input.value,
					description: "",
					completed: false,
				});
				await this.taskManager.addTask(task);
				this.taskRender.renderList();
				this.chosenElements.input.value = '';
			} else{
				alert ('Please enter a task!');
			};
		})

		document.addEventListener('keydown', async (e) => {
			if(e.key === 'Enter') {
				if (this.chosenElements.input.value.trim() !== "") {
					const task = ({
						title: this.chosenElements.input.value,
						description: "",
						completed: false,
					});
					// Використовуємо apiRequest для додавання задачі
					await this.taskManager.addTask(task);
					this.taskRender.renderList();
					this.chosenElements.input.value = '';
				} else{
					alert ('Please enter a task!');
				}
			};
		})

		this.eventFilters.filterTab();
	}
};
const app = new App();
app.init();
