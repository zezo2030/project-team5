/**
 * Register Page Script
 * Uses common.js for shared functionality
 */

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    var errorMessages = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].style.display = 'none';
    }

    var inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('error');
    }

    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");

    let isValid = true;

    // Validate username
    if (username.value.trim() === "") {
        showError(username, "Username is required");
        isValid = false;
    } else if (username.value.trim().length < 3) {
        showError(username, "Username must be at least 3 characters");
        isValid = false;
    }

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address");
        isValid = false;
    }

    // Validate password
    var passwordRegex = /^(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(password, "Password must be at least 6 characters with a number");
        isValid = false;
    }

    // Validate confirm password
    if (confirmPassword.value === "") {
        showError(confirmPassword, "Please confirm your password");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    // Check if email already registered
    var storedEmail = localStorage.getItem("userEmail");
    if (storedEmail === email.value.trim()) {
        showError(email, "This email is already registered");
        Toast.warning('This email already exists. Try logging in instead.');
        isValid = false;
    }

    if (!isValid) return;

    // Save user data
    localStorage.setItem("username", username.value.trim());
    localStorage.setItem("userEmail", email.value.trim());
    localStorage.setItem("userPassword", password.value);

    Toast.success('Account created successfully! 🎉');
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});

function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.getElementById(input.id + "-error");
    if (errorDiv) {
        errorDiv.innerText = message;
        errorDiv.style.display = 'block';
    }
}