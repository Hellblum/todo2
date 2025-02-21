class RegistrationManager {
	constructor() {
		this.usernameInput = document.querySelector('.username-input');
		this.passwordInput = document.querySelector('.password-input');
		this.regBtn = document.querySelector('.reg-btn');
		this.regBtn.addEventListener('click', () => this.handleReg());
	}
	async handleReg() {
		const username = this.usernameInput.value.trim();
		const password = this.passwordInput.value.trim();
		try{
			const res = await fetch('http://localhost:3000/auth/registration', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' },
			})
			if(!res.ok) {
				throw new Error(`Error: ${res.status} ${res.statusText}`)
			}
			const data = await res.json();
			if(data) {
				console.log('Success registration')
			}
		} catch (e) {
			console.error('Registration error'.message)
		}
	}
}

new RegistrationManager();