class TaskRender {
	constructor (taskManager) {
		this.chosenElements = new ChosenElements();
		this.taskManager = taskManager;
		this.detailsWindow = new DetailsWindow(this.chosenElements, this.taskManager, () => this.renderList());
	};
	renderList() {
		this.chosenElements.taskList.innerHTML = '';
		const filtredTasks = this.taskManager.getFilteredTasks();
		filtredTasks.forEach((task, index) => {
			const li = document.createElement('li');
			li.classList.add('list-li');
			li.innerHTML = `<span class='li-text'>${index+1}. ${task.title}</span>`;

			const checkbox = document.createElement('input');
			checkbox.classList.add('li-checkbox');
			checkbox.type = 'checkbox';
			checkbox.checked = task.completed;

			const liText = li.querySelector('.li-text');
			if(task.completed) {
				liText.style.textDecoration = 'line-through';
				liText.style.textDecorationColor = 'red';
			};
			liText.addEventListener('click', () => {
				this.detailsWindow.showModal(task);
			});
			
			checkbox.addEventListener('change', async () => {
				const newCompleted = checkbox.checked;
				await this.taskManager.updateTask(task.id, task.title, task.description, newCompleted);
				task.completed = newCompleted;
				if (newCompleted) {
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