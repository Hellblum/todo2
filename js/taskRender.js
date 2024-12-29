class TaskRender {
	constructor (taskManager, taskList) {
		this.taskManager = taskManager;
		this.taskList = taskList;
	};
	renderList() {
		this.taskList.innerHTML = '';
		const filtredTasks = this.taskManager.getFilteredTasks();
		filtredTasks.map( (task, id) => {
			const li = document.createElement('li');
			li.classList.add('list-li');
			li.innerHTML = `<span class='li-text'>${id + 1}. ${task.title}</span>`;
			const checkbox = document.createElement('input');
			checkbox.classList.add('li-checkbox');
			checkbox.type = 'checkbox';
			checkbox.checked = task.completed;
			const liText = li.querySelector('.li-text');
			if(task.completed) {
				liText.style.textDecoration = 'line-through';
				liText.style.textDecorationColor = 'red';
			};
			checkbox.addEventListener('change', () => {
				this.taskManager.toggleTaskCompletion(id);
				if (checkbox.checked) {
					liText.style.textDecoration = 'line-through';
					liText.style.textDecorationColor = 'red';
				} else {
					liText.style.textDecoration = 'none';
				};
			});
			const removeBtn = document.createElement('button');
			removeBtn.classList.add('li-remove-btn');
			removeBtn.innerHTML = 'Remove';
			removeBtn.addEventListener('click', () => {
				this.taskManager.removeTask(id);
				this.renderList();
			});
			li.append(checkbox, removeBtn);
			taskList.appendChild(li);
		});
	};
	handleFilter(filter) {
		this.taskManager.setFilter(filter);
		this.renderList();
	};	
};