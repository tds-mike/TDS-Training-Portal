/**
 * TDS Training Portal Authentication
 *
 * This script checks if the user is logged in before showing page content.
 * If not logged in, it redirects to the main index page.
 * It also includes an automatic logout timer for inactivity.
 */
(function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const onIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

    // If not logged in and not on the login page, redirect.
    if (!isLoggedIn && !onIndexPage) {
        window.location.href = 'index.html';
    }

    // --- Automatic Logout Timer ---
    // This part of the script only runs if the user is logged in.
    if (isLoggedIn) {
        let inactivityTimer;

        // Set the timeout duration in milliseconds. 15 minutes = 15 * 60 * 1000
        const timeoutDuration = 15 * 60 * 1000;

        // Function to log the user out
        const logout = () => {
            sessionStorage.removeItem('isLoggedIn');
            alert("You have been automatically logged out due to inactivity.");
            window.location.href = 'index.html';
        };

        // Function to reset the timer
        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(logout, timeoutDuration);
        };

        // Add event listeners to reset the timer whenever the user is active
        window.addEventListener('load', resetTimer);
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);
        window.addEventListener('touchstart', resetTimer);
    }
})();