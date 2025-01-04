class TaskRender {
	constructor (taskManager) {
		this.chosenElements = new ChosenElements();
		this.taskManager = taskManager;
	};
	renderList() {
		this.chosenElements.taskList.innerHTML = '';
		const filtredTasks = this.taskManager.getFilteredTasks();
		filtredTasks.map(task => {
			const li = document.createElement('li');
			li.classList.add('list-li');
			li.innerHTML = `<span class='li-text'>${task.id}. ${task.title}</span>`;

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
				this.taskManager.toggleTaskCompletion(task.id);
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
			removeBtn.addEventListener('click', async () => {
				await this.taskManager.removeTask(task.id);
				this.renderList();
			});

			li.append(checkbox, removeBtn);
			this.chosenElements.taskList.appendChild(li);
		});
	};
	handleFilter(filter) {
		this.taskManager.setFilter(filter);
		this.renderList();
	};	
};