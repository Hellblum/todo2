class ApiManager {
	constructor() {}
	getTokenFromCookie() {
		const match = document.cookie.match(/(^| )token=([^;]+)/);
		return match ? match[2] : null;
	}
	redirection () {
		window.location.href = '/auth.html'
	}
	async verifyToken(token) {
		if(!token) {
			window.location.href = '/auth.html'
			return false
		}
		try{
			const res = await fetch('http://localhost:3000/auth/check-token', {
				method: 'GET',
				headers: { 'Authorization': `Bearer ${token}` }
			})
			console.log("Response from server:", res.status);
			if(!res.ok) {
				this.redirection()
				return false
			}
			return true
		} catch (e) {
			console.log(e);
			this.redirection();
			return false
		}
	}
	async getAllTasks() {
		try{
			const token = this.getTokenFromCookie();
			const isValid = await this.verifyToken(token);
			if(!isValid) {
				return
			}
			const res = await fetch('http://localhost:3000/todos', {
				headers: token ? { 'Authorization': `Bearer ${token}` } : {},
			});
			if (!res.ok) {
				throw new Error("responce not ok, getAllTasks")
			}
			return await res.json()
		} catch (error) {
			console.error(error.message)
		}
		
	};
	async addNewTask(task) {
		const token = this.getTokenFromCookie();
		const isValid = await this.verifyToken(token);
			if(!isValid) {
				return
			}
		const res = await fetch('http://localhost:3000/todos', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-type': 'application/json',
				'Authorization': token ? `Bearer ${token}` : '',
			},
		});
		return await res.json();
	}
	async deleteNewTask(id) {
		try {
			if (!id) {
            throw new Error("ID is required to delete a task");
			}
			const token = this.getTokenFromCookie();
			const isValid = await this.verifyToken(token);
			if(!isValid) {
				return
			}
			const res = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
			});
			return await res.json();
		} catch (err) {
			console.log({message: err})
		}
	}
	async patchNewTask(id, updates) {
		const token = this.getTokenFromCookie();
		const isValid = await this.verifyToken(token);
			if(!isValid) {
				return
			}
		const res = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(updates),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token ? `Bearer ${token}` : '',
			},
		});
	
		if (res.ok) {
			return await res.json();
		} else {
			const err = await res.json();
			console.error("Error updating task:", err.message);
		}
	}
}
