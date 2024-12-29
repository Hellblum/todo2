class GetData {
	constructor() {
		this.data = [];
	}
	async fetchData() {
		const response = await fetch('https://jsonplaceholder.typicode.com/user/3/todos');
		this.data = response.json();
		return this.data;
	};
}