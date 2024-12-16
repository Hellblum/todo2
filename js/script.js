const input = document.querySelector('.input');
const btn = document.querySelector('.input-btn');
const taskList = document.querySelector('.list');

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
	}

	addTask(task) {
		this.tasks.push(task);
	}

	removeTask(index) {
		this.tasks.splice(index, 1);
	}

	toggleTaskCompletion(index) {
	this.tasks[index].toggleCompleted();
	}
};

class TaskRender {
	constructor (taskManager, taskList) {
		this.taskManager = taskManager;
		this.taskList = taskList;
	}
	renderList() {
		this.taskList.innerHTML = '';
		this.taskManager.tasks.map( (task, index) => {
			const li = document.createElement('li');
			li.classList.add('list-li');
			li.innerHTML = `<span class='li-text'>${index + 1}. ${task.text}</span>`;
			//checkbox
			const checkbox = document.createElement('input');
			checkbox.classList.add('li-checkbox');
			checkbox.type = 'checkbox';
			checkbox.addEventListener('change', () => {
				this.taskManager.toggleTaskCompletion(index);
				const liText = li.querySelector('.li-text');
				if (checkbox.checked) {
					liText.style.textDecoration = 'line-through';
				} else {
					liText.style.textDecoration = 'none';
				};
			});
			//remove btn
			const removeBtn = document.createElement('button');
			removeBtn.classList.add('li-remove-btn');
			removeBtn.innerHTML = 'Remove';
			removeBtn.addEventListener('click', () => {
				this.taskManager.removeTask(index);
				this.renderList();
			});
			//apendind
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
		btn.addEventListener('click', () => {
			const task = new Task(input.value);
				this.taskManager.addTask(task);
				this.taskRender.renderList();
				input.value = '';
				console.log(task)
		});
	}
}
const app = new App(); 
app.init()


