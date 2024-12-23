const input = document.querySelector('.input');
const inputBtn = document.querySelector('.input-btn');
const taskList = document.querySelector('.list');
const allTab = document.querySelector('.tab-all');
const currentTab = document.querySelector('.tab-current');
const completedTab = document.querySelector('.tab-completed');

class Task {
	constructor(text) {
		this.text = text;
		this.completed = false;
	}

	toggleCompleted() {
		this.completed = !this.completed;
	}
};

class TaskManager {
	constructor() {
		this.tasks = [];
		this.filter = 'all';
	}

	addTask(task) {
		this.tasks.push(task);
		this.logTasks();
	}

	removeTask(index) {
		this.tasks.splice(index, 1);
		this.logTasks();
	}

	toggleTaskCompletion(index) {
	this.tasks[index].toggleCompleted();
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
	};

	logTasks() {
		console.table(this.tasks);
	}
};

class TaskRender {
	constructor (taskManager, taskList) {
		this.taskManager = taskManager;
		this.taskList = taskList;
		
	}

	handleFilter(filter) {
		this.taskManager.setFilter(filter);
		this.renderList();
	};	

	renderList() {
		this.taskList.innerHTML = '';
		const filtredTasks = this.taskManager.getFilteredTasks();
		filtredTasks.map( (task, index) => {
			const li = document.createElement('li');
			li.classList.add('list-li');
			li.innerHTML = `<span class='li-text'>${index + 1}. ${task.text}</span>`;
			const checkbox = document.createElement('input');
			checkbox.classList.add('li-checkbox');
			checkbox.type = 'checkbox';
			checkbox.checked = task.completed;
			const liText = li.querySelector('.li-text');
			if(task.completed) {
				liText.style.textDecoration = 'line-through';
			};
			checkbox.addEventListener('change', () => {
				this.taskManager.toggleTaskCompletion(index);
				if (checkbox.checked) {
					liText.style.textDecoration = 'line-through';
				} else {
					liText.style.textDecoration = 'none';
				};
			});
			const removeBtn = document.createElement('button');
			removeBtn.classList.add('li-remove-btn');
			removeBtn.innerHTML = 'Remove';
			removeBtn.addEventListener('click', () => {
				this.taskManager.removeTask(index);
				this.renderList();
			});
			li.append(checkbox, removeBtn);
			taskList.appendChild(li);
		});
	}
};

class App {
	constructor () {
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender(this.taskManager, taskList);
	}
	init () {
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

		allTab.addEventListener('click', () => {
			this.taskManager.setFilter('all');
			this.taskRender.renderList();
		});

		currentTab.addEventListener('click', () => {
			this.taskManager.setFilter('pending');
			this.taskRender.renderList();
		});

		completedTab.addEventListener('click', () => {
			this.taskManager.setFilter('completed');
			this.taskRender.renderList();
		});
	}
};
const app = new App();
app.init();

