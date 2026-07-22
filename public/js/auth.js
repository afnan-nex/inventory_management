document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const togglePasswordIcon = document.getElementById('togglePasswordIcon');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginSpinner = document.getElementById('loginSpinner');
    const loginBtnText = document.getElementById('loginBtnText');

    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordIcon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
    });

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('remember_me').checked;

        if (!email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        loginBtn.disabled = true;
        loginSpinner.classList.remove('d-none');
        loginBtnText.textContent = 'Signing in...';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, remember_me: rememberMe })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.data.token);
            showAlert('Login successful! Redirecting...', 'success');

            setTimeout(() => {
                window.location.href = 'pages/dashboard.html';
            }, 1000);
        } catch (error) {
            showAlert(error.message, 'danger');
        } finally {
            loginBtn.disabled = false;
            loginSpinner.classList.add('d-none');
            loginBtnText.textContent = 'Sign In';
        }
    });
});
