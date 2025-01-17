class TaskRender {
	constructor (taskManager) {
		this.chosenElements = new ChosenElements();
		this.taskManager = taskManager;
		this.closeModal();
	};
	renderList() {
		this.chosenElements.taskList.innerHTML = '';
		const filtredTasks = this.taskManager.getFilteredTasks();
		filtredTasks.map((task, index) => {
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
				this.showModal(task.description)
			});
			
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
	showModal(description) {
		this.chosenElements.modalText.innerHTML = description;
		this.chosenElements.modalDescription.style.display = 'block';
	}
	closeModal() {
		this.chosenElements.modalClose.addEventListener('click', () => {
			this.chosenElements.modalDescription.style.display = 'none';
		});
		this.chosenElements.modalDescription.addEventListener('click', () => {
			if (event.target !== this.chosenElements.modalWindow) {
				this.chosenElements.modalDescription.style.display = 'none';
			}
		})
	}
	handleFilter(filter) {
		this.taskManager.setFilter(filter);
		this.renderList();
	};	
};