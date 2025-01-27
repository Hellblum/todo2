class ChosenElements {
	constructor() {
		this.input = document.querySelector('.input');
		this.description = document.querySelector('.input-description');
		this.inputBtn = document.querySelector('.input-btn');
		this.taskList = document.querySelector('.list');
		//tabs
		this.allTab = document.querySelector('.tab-all-btn');
		this.currentTab = document.querySelector('.tab-current-btn');
		this.completedTab = document.querySelector('.tab-completed-btn');
		//details-modal
		this.taskDetails = document.querySelector('.container-task-details');
		this.detailsModal = document.querySelector('.task-details-modal');
		this.detailsContent = document.querySelector('.details-content');
		this.descriptionBox = document.querySelector('.details-description');
		this.itemDescription = document.querySelector('.details-item-description');
		this.itemTitle = document.querySelector('.details-item-title');
		this.descriptionBtns = document.querySelector('.details-description-buttons');
		this.saveDescriptionBtn = document.querySelector('.description-save-btn');
		this.cancelDescriptionBtn = document.querySelector('.description-cancel-btn');
		this.detailsCloseBtn = document.querySelector('.details-close-btn');
		this.subDescTitle = document.querySelector('.details-item');
		this.redSubDescTitle = document.querySelector('.details-item-unsave');
	}
}
