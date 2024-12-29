const input = document.querySelector('.input');
const inputBtn = document.querySelector('.input-btn');
const taskList = document.querySelector('.list');
const allTab = document.querySelector('.tab-all-btn');
const currentTab = document.querySelector('.tab-current-btn');
const completedTab = document.querySelector('.tab-completed-btn');
class Task {
	constructor(title) {
		this.title =  title;
		this.completed = false;
	};
	toggleCompleted() {
		this.completed = !this.completed;
	};
};