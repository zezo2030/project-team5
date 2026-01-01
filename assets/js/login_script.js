/**
 * Login Page Script
 * Uses common.js for shared functionality
 */

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var errorMessages = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].style.display = 'none';
    }

    var inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('error');
    }

    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");

    let isValid = true;

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address");
        isValid = false;
    }

    // Validate password
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    }

    if (!isValid) return;

    // Check stored credentials
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email.value.trim() === storedEmail && password.value === storedPassword) {
        Toast.success('Login successful! Welcome back 👋');
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else if (!storedEmail) {
        Toast.error('No account found. Please sign up first.');
    } else {
        showError(password, "Incorrect email or password");
        Toast.error('Login failed. Please check your credentials.');
    }
});

function showError(input, message) {
    input.classList.add('error');
    var errorDiv = document.getElementById(input.id + "-error");
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
}