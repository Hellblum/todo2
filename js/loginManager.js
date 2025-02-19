class LoginManager {
	constructor() {
			this.logNameInput = document.querySelector('.log-username-input');
			this.logPassInput = document.querySelector('.log-password-input');
			this.logBtn = document.querySelector('.log-btn');
			this.startEvent();
	}

	async startEvent() {
			try {
				console.log("Starting token verification...");
				await this.verifyToken();
			} catch (err) {
				console.log("Token verification failed or no token found.");
			}
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
				});
				if (!res.ok) {
					throw new Error(`Error: ${res.status} ${res.statusText}`);
				}
				const data = await res.json();
				if (data.token) {
					setTokenToCookie(data.token);
					console.log("Success login, token saved");
					await this.verifyToken();
					window.location.href = '/index.html';
				} else {
					throw new Error("No token received");
				}
			} catch (err) {
				console.log("Login error", err.message);
			}
	}

	async verifyToken() {
			try {
				const token = getTokenFromCookie();
				if (!token) throw new Error("No token found");
				const res = await fetch('http://localhost:3000/auth/check-token', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
				if (!res.ok) throw new Error(`Invalid token: ${res.status} ${res.statusText}`);
				const data = await res.json();
				console.log('Token is valid', data);
				window.location.href = '/index.html';
			} catch (err) {
				console.log('Token verification failed:', err.message);
			}
	}
}

function setTokenToCookie(token) {
	document.cookie = `token=${token}; path=/`;
}

function getTokenFromCookie() {
	const match = document.cookie.match(/(^| )token=([^;]+)/);
	return match ? match[2] : null;
}

new LoginManager();
