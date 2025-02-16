class App {
	constructor () {
		this.chosenElements = new ChosenElements();
		this.apiManager = new ApiManager();
		this.taskManager = new TaskManager();
		this.taskRender = new TaskRender(this.taskManager, this.taskList);
		this.eventFilters = new EventFilters(this.chosenElements, this.taskRender);
	}
	async init () {
		const isAuthenticated = await this.verifyToken();
			if (!isAuthenticated) {
				window.location.href = "auth.html";
				
				return;
			}
		this.chosenElements.input.focus();
		await this.taskManager.tasksLoader();
		this.taskRender.renderList();

		this.chosenElements.inputBtn.addEventListener('click', async () => {
			if (this.chosenElements.input.value.trim() !== "") {
				const task = ({
					title: this.chosenElements.input.value,
					description: "",
					completed: false,
				});
				await this.taskManager.addTask(task);
				this.taskRender.renderList();
				this.chosenElements.input.value = '';
			} else{
				alert ('Please enter a task!')
			};
		})

		document.addEventListener('keydown', async (e) => {
			if(e.key === 'Enter') {
				if (this.chosenElements.input.value.trim() !== "") {
					const task = ({
						title: this.chosenElements.input.value,
						description: "",
						completed: false,
					});
					await this.taskManager.addTask(task);
					this.taskRender.renderList();
					this.chosenElements.input.value = '';
				} else{
					alert ('Please enter a task!')
				}
			};
		})
		
		this.eventFilters.filterTab();
	}

	async verifyToken() {
		try {
			const res = await fetch('http://localhost:3000/auth/check-token', {
				method: 'GET',
				credentials: 'include',
			});
			if (!res.ok) throw new Error(`Invalid token: ${res.status} ${res.statusText}`);
			return true;
		} catch (err) {
			console.log('Token verification failed:', err.message);
			return false;
		}
	}
};
const app = new App();
app.init();