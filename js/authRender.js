class AuthRender{
	constructor() {
		this.authContainer = document.querySelector('.auth-container')
		this.errContainer = document.querySelector('.err-container')
		this.renderAuthForm()
		this.usernameInput.focus()
		this.validationAuthForm()
	}
	validationAuthForm(){
		this.authContainer.addEventListener('submit', async (e) =>{
			e.preventDefault();
			this.errContainer.innerHTML = '';
			let messages = []
			if(!this.usernameInput.value.trim()) {
				messages.push('Name is required')
			}
			if(this.passwordInput.value.length < 4) {
				messages.push('Password must be longer than 4 characters')
			}
			if(this.passwordInput.value.length > 20) {
				messages.push('Password must be less than 20 characters')
			}
			if(messages.length > 0) {
				this.errContainer.innerHTML = messages.join(', <br>');
				return;
			}
			const username = this.usernameInput.value.trim();
			const password = this.passwordInput.value;
			const toggle = this.formTitle.textContent === 'Sign In';
			const url = toggle ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/auth/registration';
			try{
				const res = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await res.json();
				if (!data.ok) {
					this.errContainer.innerHTML = `${data.message}`
				}
			} catch (e) {
				console.error('Error:', e.message);
				this.errContainer.innerHTML = 'Server error. Try again later.';
			}
		})
	}
	renderAuthForm(){
		this.authContainer.innerHTML = '';

		this.formTitle = document.createElement('h2');
		this.formTitle.classList.add('auth-title');
		this.formTitle.textContent = 'Sign In';

		const usernameField = document.createElement('div');
		usernameField.classList.add('username-field');

		const usernameLabel = document.createElement('h3');
		usernameLabel.classList.add('username-label');
		usernameLabel.textContent = 'Username';

		this.usernameInput = document.createElement('input');
		this.usernameInput.classList.add('username-input');
		this.usernameInput.type = 'text';
		this.usernameInput.placeholder = 'Please enter username';

		const passwordField = document.createElement('div');
		passwordField.classList.add('password-field');

		const passwordLabel = document.createElement('h3');
		passwordLabel.classList.add('password-label');
		passwordLabel.textContent = 'Password';

		this.passwordInput = document.createElement('input')
		this.passwordInput.classList.add('password-input');
		this.passwordInput.type = 'password';
		this.passwordInput.placeholder = 'Please enter password';

		const logBtn = document.createElement('button');
		logBtn.classList.add('log-btn');
		logBtn.textContent = 'Sign In';
		logBtn.type = 'submit';

		const regBtn = document.createElement('button');
		regBtn.classList.add('reg-btn');
		regBtn.textContent = 'Sign Up';
		regBtn.style.display = 'none';
		regBtn.type = 'submit';

		const toggleBtn = document.createElement('button');
		toggleBtn.classList.add('toggle-btn');
		toggleBtn.textContent = 'Need an account? Register';
		toggleBtn.type = 'button';

		toggleBtn.addEventListener('click', () => {
			const isLogin = this.formTitle.textContent === 'Sign In';
			this.formTitle.textContent = isLogin ? 'Sign Up' : 'Sign In';
			logBtn.style.display = isLogin ? 'none' : 'block';
			regBtn.style.display = isLogin ? 'block' : 'none';
			toggleBtn.textContent = isLogin ? 'Have an account? Login' : 'Need an account? Register';
		})

		usernameField.append(usernameLabel, this.usernameInput);
		passwordField.append(passwordLabel, this.passwordInput);
		this.authContainer.append(this.formTitle, usernameField, passwordField, logBtn, regBtn, this.errContainer, toggleBtn);
	}
}
new AuthRender()