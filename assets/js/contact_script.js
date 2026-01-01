/**
 * Contact Page Script
 * Uses common.js for shared functionality
 */

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.querySelector('.submit_btn');
    const emailInput = document.querySelector('.mess_sec input[type="email"]');
    const messageInput = document.querySelector('.mess_sec textarea');

    if (submitBtn) {
        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate email
            if (!emailInput || !emailInput.value.trim()) {
                Toast.error('Please enter your email address');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                Toast.error('Please enter a valid email address');
                return;
            }

            // Validate message
            if (!messageInput || !messageInput.value.trim()) {
                Toast.error('Please enter your message');
                return;
            }

            // Simulate form submission
            Toast.success('Message sent successfully! We\'ll get back to you soon.');

            // Clear form
            emailInput.value = '';
            messageInput.value = '';
        });
    }
});