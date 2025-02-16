class LoginManager {
	constructor() {
		this.logNameInput = document.querySelector('.log-username-input');
		this.logPassInput = document.querySelector('.log-password-input');
		this.logBtn = document.querySelector('.log-btn');
		this.startEvent();
	}

	startEvent() {
		console.log("Success login");
			setTimeout(() => {
				this.verifyToken(true);
			}, 500)
		this.logBtn.addEventListener('click', () => this.handleLogin());
	}

	async handleLogin() {
		const username = this.logNameInput.value.trim();
		const password = this.logPassInput.value.trim();
		try {
			const res = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			});
			if (!res.ok) {
				throw new Error(`Error: ${res.status} ${res.statusText}`);
			}
			console.log("Success login");
			this.verifyToken();
			// setTimeout(() => {
			// 	this.verifyToken();
			// }, 50)
		} catch (err) {
			console.log("Login error", err.message);
		}
	}

	async verifyToken(success = false) {
		try {
				console.log('Starting token verification...');
				const res = await fetch('http://localhost:3000/auth/check-token', {
					method: 'GET',
					credentials: 'include',
				});
				if (!res.ok) throw new Error(`Invalid token: ${res.status} ${res.statusText}`);
				const data = await res.json();
				console.log('Token is valid', data);
				if(success){
					window.location.href = "/index.html"; 
					// setTimeout(() => {
					// 	window.location.href = "/index.html"; 
					// }, 100);
				}
		} catch (err) {
				console.log('Token verification failed:', err.message);
		}
	}
}

new LoginManager();