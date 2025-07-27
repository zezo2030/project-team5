window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar')
    const body = document.body

    if (window.scrollY >= 40) {
        navbar.classList.add('scrolled');
        body.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
        body.classList.remove('scrolled');
    }
})

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