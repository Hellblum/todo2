class AuthRender{
	constructor() {
		this.authContainer = document.querySelector('.auth-container')
		this.errContainer = document.querySelector('.err-container')
		this.renderAuthForm()
		this.usernameInput.focus();
		this.validationAuthForm()
	}
	validationAuthForm(){
		this.authContainer.addEventListener('submit',(e) =>{
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
		})
	}
	renderAuthForm(){
		this.authContainer.innerHTML = '';

		const formTitle = document.createElement('h2');
		formTitle.classList.add('auth-title');
		formTitle.textContent = 'Sign In';

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
			const isLogin = formTitle.textContent === 'Sign In';
			formTitle.textContent = isLogin ? 'Sign Up' : 'Sign In';
			logBtn.style.display = isLogin ? 'none' : 'block';
			regBtn.style.display = isLogin ? 'block' : 'none';
			toggleBtn.textContent = isLogin ? 'Have an account? Login' : 'Need an account? Register';
		})

		usernameField.append(usernameLabel, this.usernameInput);
		passwordField.append(passwordLabel, this.passwordInput);
		this.authContainer.append(formTitle, usernameField, passwordField, logBtn, regBtn, this.errContainer, toggleBtn);
	}
}
new AuthRender()