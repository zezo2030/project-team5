document.getElementById("loginForm").addEventListener("submit", function(event) {
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


    var  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim()) || !email.value.includes(".com")) {
        showError(email, "Please enter a valid email address that includes '@' and '.com'");
        isValid = false;
    }


    var passwordRegex = /^(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(password, "Password must be at least 6 characters and include at least one number.");
        isValid = false;
    }

    if (!isValid) return;


    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email.value.trim() === storedEmail && password.value === storedPassword) {

        // window.location.href = "index.html";

        open("index.html","_self");
    } else {
        showError(password, "Incorrect email or password.");
    }
});

function showError(input, message) {
    input.classList.add('error');
    var errorDiv = document.getElementById(input.id + "-error");
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