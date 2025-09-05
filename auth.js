/**
 * TDS Training Portal Authentication
 * Version 2.0 - Root-Relative Pathing
 * This script checks if the user is logged in before showing page content.
 * If not logged in, it redirects to the main index page using a reliable root-relative path.
 */
(function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const rootPath = '/TDS-Training-Portal/';
    const onIndexPage = window.location.pathname === rootPath || window.location.pathname.endsWith('/index.html');

    // If not logged in and not on the login page, redirect.
    if (!isLoggedIn && !onIndexPage) {
        window.location.href = `${rootPath}index.html`;
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
            // Use the hardcoded root path for the logout redirect.
            window.location.href = `${rootPath}index.html`;
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

