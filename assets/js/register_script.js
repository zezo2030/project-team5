

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

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

    let isValid = true;

    if (username.value.trim() === "") {
        showError(username, "Username is required");
        isValid = false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim()) || !email.value.includes(".com")) {
        showError(email, "Please enter a valid email address containing '@' and '.com'");
        isValid = false;
    }

    var passwordRegex = /^(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(password, "Password must be at least 6 characters and include at least one number.");
        isValid = false;
    }

    var storedEmail = localStorage.getItem("userEmail");
    if (storedEmail === email.value.trim()) {
        showError(email, "This email is already registered. Please login instead.");
        isValid = false;
    }

    if (!isValid) return;

    localStorage.setItem("username", username.value.trim());
    localStorage.setItem("userEmail", email.value.trim());
    localStorage.setItem("userPassword", password.value);



    // window.location.href = "login.html";
    open("login.html", "_self");
});

function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.getElementById(input.id + "-error");
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
}


// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if dark mode preference is saved in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Set initial state based on saved preference or current state
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        updateDarkModeIcon(false);
    }

    // Add click event listener to the dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();

            // Toggle dark mode class on body
            body.classList.toggle('dark-mode');

            // Check if dark mode is now active
            const isNowDarkMode = body.classList.contains('dark-mode');

            // Update icon
            updateDarkModeIcon(isNowDarkMode);

            // Save preference to localStorage
            localStorage.setItem('darkMode', isNowDarkMode);
        });
    }

    // Function to update the dark mode icon
    function updateDarkModeIcon(isDark) {
        if (darkModeToggle) {
            if (isDark) {
                // Change to light mode icon for switching to light mode
                darkModeToggle.textContent = 'light_mode';
                darkModeToggle.title = 'Switch to light mode';
            } else {
                // Change to dark mode icon for switching to dark mode
                darkModeToggle.textContent = 'dark_mode';
                darkModeToggle.title = 'Switch to dark mode';
            }
        }
    }
});