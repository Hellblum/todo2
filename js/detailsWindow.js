class DetailsWindow {
	constructor(chosenElements, taskManager, onCloseCallback){
		this.chosenElements = chosenElements;
		this.taskManager = taskManager;
		this.onCloseCallback = onCloseCallback;
		this.closeModal();
	}
	editTitle(task) {
		this.chosenElements.itemTitle.value = task.title;
		
		this.chosenElements.itemTitle.oninput = async () => {
			const newTitle = this.chosenElements.itemTitle.value.trim();
			if (newTitle !== "" && newTitle !== task.title) {
				await this.taskManager.updateTask(task.id, newTitle, task.description, task.completed);
				task.title = newTitle;
			}
		};
	}
	
	editDescription(task) {
		this.chosenElements.itemDescription.value = task.description;
		
		let tempDescription = task.description;
		let isDescChanges = false;

		this.focusBtns =  () => {
			this.chosenElements.saveDescriptionBtn.style.opacity = '1';
			this.chosenElements.cancelDescriptionBtn.style.opacity = '1';
			this.chosenElements.saveDescriptionBtn.style.visibility = 'visible';
			this.chosenElements.cancelDescriptionBtn.style.visibility = 'visible';
		}

		this.blurBtns = () => {
			this.chosenElements.saveDescriptionBtn.style.opacity = '0';
			this.chosenElements.cancelDescriptionBtn.style.opacity = '0';
			this.chosenElements.saveDescriptionBtn.style.visibility = 'hidden';
			this.chosenElements.cancelDescriptionBtn.style.visibility = 'hidden';
		}
		
		this.chosenElements.itemDescription.onfocus =  this.focusBtns;
		this.chosenElements.itemDescription.onblur = this.blurBtns;

		this.chosenElements.itemDescription.oninput = async () => {
			tempDescription = this.chosenElements.itemDescription.value.trim();
			if (task.description !== this.chosenElements.itemDescription.value) {
				isDescChanges = true;
			} else {
				isDescChanges = false;
			}
			
			if (isDescChanges) {
            this.chosenElements.redSubDescTitle.style.display = 'block';
            this.chosenElements.subDescTitle.style.display = 'none';
			} else {
            this.chosenElements.redSubDescTitle.style.display = 'none';
            this.chosenElements.subDescTitle.style.display = 'block';
			}
			task.description = tempDescription;
		};

		this.chosenElements.saveDescriptionBtn.onclick = async () => {
			const newDescription = this.chosenElements.itemDescription.value.trim();
			await this.taskManager.updateTask(task.id, task.title, newDescription, task.completed);
			task.description = newDescription;
			tempDescription = newDescription;
			isDescChanges = false;
			this.chosenElements.redSubDescTitle.style.display = 'none';
			this.chosenElements.subDescTitle.style.display = 'block';
		}

		this.chosenElements.cancelDescriptionBtn.onclick = () => {
			this.chosenElements.itemDescription.value = task.description;
			tempDescription = task.description; 
			isDescChanges = false;
			this.chosenElements.redSubDescTitle.style.display = 'none';
			this.chosenElements.subDescTitle.style.display = 'block';
		}
	}
	
	showModal(task) {
		this.chosenElements.taskDetails.style.display = 'block';
		document.body.style.overflow = 'hidden';
		this.editTitle(task);
		this.editDescription(task);
	}
	closeModal() {
		this.chosenElements.detailsCloseBtn.addEventListener('click', () => {
			this.hideModal();
		});
		this.chosenElements.detailsModal.addEventListener('click', (e) => {
			if (e.target === this.chosenElements.detailsModal) {
				this.hideModal();
			}
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.hideModal();
			}
		});
	}
	hideModal() {
		this.chosenElements.taskDetails.style.display = 'none';
		document.body.style.overflow = 'visible';
		this.onCloseCallback();
	}
	
}