class LogoutManager {
	constructor() {
		this.logoutBtn = document.querySelector('.logout-btn');
		this.logoutBtn.addEventListener('click', () => this.handleLogout());
	}

	handleLogout() {
		try {
			document.cookie = "token=; path=/; max-age=0";
			window.location.href = "/auth.html";
		} catch (e) {
			console.error("Logout error:", e.message);
		}
	}
}

new LogoutManager();
