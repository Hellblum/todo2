class App {
	constructor() {
		this.taskList = document.querySelector('.list');
		this.inputBtn = document.querySelector('.input-btn')
		this.input = document.querySelector('.input')
		this.allTab = document.querySelector('.tab-all-btn');
		this.currentTab = document.querySelector('.tab-current-btn');
		this.completedTab = document.querySelector('.tab-completed-btn');
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender (this.taskManager, this.taskList);
		this.getData = new ApiService();
	}

	async init() {
		await this.taskManager.loadTasks();
		this.taskRender.renderList();
			
		this.inputBtn.addEventListener('click', () => {
			
			if (this.input.value.trim() !== "") {
				const task = new Task({
					id: Math.random(),
					title: this.input.value,
					comleted: false
				});
				this.taskManager.addTask(task);
				this.taskRender.renderList();
				this.input.value = '';
			} else {
				alert('Please enter a task!');
			}
		});

		this.allTab.addEventListener('click', () => this.taskRender.handleFilter('all'));
		this.currentTab.addEventListener('click', () => this.taskRender.handleFilter('pending'));
		this.completedTab.addEventListener('click', () => this.taskRender.handleFilter('completed'));
	}
}

const app = new App();
app.init();
