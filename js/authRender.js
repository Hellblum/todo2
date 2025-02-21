class AuthRender{
	constructor() {
		this.renderAuthForm();
	}
	renderAuthForm(){
		const authContainer = document.querySelector('.auth-container')

		const formTitle = document.createElement('h2');
		formTitle.classList.add('auth-title');
		formTitle.textContent = 'Sign In';

		const usernameField = document.createElement('div');
		usernameField.classList.add('username-field');

		const usernameLabel = document.createElement('h3');
		usernameLabel.classList.add('username-label');
		usernameLabel.textContent = 'Username';

		const usernameInput = document.createElement('input');
		usernameInput.classList.add('username-input');
		usernameInput.type = 'text';
		usernameInput.placeholder = 'Please enter username';

		const passwordField = document.createElement('div');
		passwordField.classList.add('password-field');

		const passwordLabel = document.createElement('h3');
		passwordLabel.classList.add('password-label');
		passwordLabel.textContent = 'Password';

		const passwordInput = document.createElement('input');
		passwordInput.classList.add('password-input');
		passwordInput.type = 'password';
		passwordInput.placeholder = 'Please enter password';

		const logBtn = document.createElement('button');
		logBtn.classList.add('log-btn');
		logBtn.textContent = 'Sign In';

		const regBtn = document.createElement('button');
		regBtn.classList.add('reg-btn');
		regBtn.textContent = 'Sign Up';
		regBtn.style.display = 'none';

		const toggleBtn = document.createElement('button');
		toggleBtn.classList.add('toggle-btn');
		toggleBtn.textContent = 'Need an account? Register';

		toggleBtn.addEventListener('click', () => {
			const isLogin = formTitle.textContent === 'Sign In';
			formTitle.textContent = isLogin ? 'Sign Up' : 'Sign In';
			logBtn.style.display = isLogin ? 'none' : 'block';
			regBtn.style.display = isLogin ? 'block' : 'none';
			toggleBtn.textContent = isLogin ? 'Have an account? Login' : 'Need an account? Register';
		})

		usernameField.append(usernameLabel, usernameInput);
		passwordField.append(passwordLabel, passwordInput);
		authContainer.append(formTitle, usernameField, passwordField, logBtn, regBtn, toggleBtn);
	}
}
new AuthRender()