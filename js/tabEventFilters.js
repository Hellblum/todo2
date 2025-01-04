	class EventFilters {
		constructor(chosenElements, taskRender) {
			this.chosenElements = chosenElements;
			this.taskRender = taskRender;
		}

		filterTab() {
			this.chosenElements.allTab.addEventListener('click', () => 
				this.taskRender.handleFilter('all')
			);
			this.chosenElements.currentTab.addEventListener('click', () =>
				this.taskRender.handleFilter('pending')
			);
			this.chosenElements.completedTab.addEventListener('click', () => 
				this.taskRender.handleFilter('completed')
			);
		}
	}