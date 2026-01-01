/**
 * Profile Page Script
 * Logic for profile.html
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'login.html';
        return;
    }

    // Load User Data
    const username = localStorage.getItem('username') || userEmail.split('@')[0];
    const password = localStorage.getItem('userPassword');

    // Populate UI
    document.getElementById('profile-name').textContent = `Hello, ${username}`;
    document.getElementById('profile-email').textContent = userEmail;

    const profileUsernameInput = document.getElementById('profileUsername');
    if (profileUsernameInput) profileUsernameInput.value = username;

    const profileEmailInput = document.getElementById('profileEmail');
    if (profileEmailInput) profileEmailInput.value = userEmail;


    // Handle Profile Info Update
    const infoForm = document.getElementById('profileInfoForm');
    if (infoForm) {
        infoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const newUsername = document.getElementById('profileUsername').value.trim();

            if (newUsername.length < 3) {
                Toast.error('Username must be at least 3 characters');
                return;
            }

            localStorage.setItem('username', newUsername);
            document.getElementById('profile-name').textContent = `Hello, ${newUsername}`;
            Toast.success('Profile updated successfully!');

            // Update auth menu name if common.js re-runs or on reload
            setTimeout(() => location.reload(), 1000);
        });
    }

    // Handle Password Change
    const passwordForm = document.getElementById('profilePasswordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const currentPass = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmNewPassword').value;

            const storedPass = localStorage.getItem('userPassword');

            if (currentPass !== storedPass) {
                Toast.error('Incorrect current password');
                return;
            }

            if (newPass.length < 6) {
                Toast.error('New password must be at least 6 characters');
                return;
            }

            if (newPass !== confirmPass) {
                Toast.error('New passwords do not match');
                return;
            }

            localStorage.setItem('userPassword', newPass);
            Toast.success('Password changed successfully!');
            passwordForm.reset();
        });
    }
});
