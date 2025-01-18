// Declare a global variable for the background music
let backgroundMusic;

document.addEventListener('DOMContentLoaded', function() {
    // Load the background music
    backgroundMusic = new Audio("static/sounds/frozen_winter.mp3");
    backgroundMusic.loop = true;  // Loop the background music

    // Play the background music when the page loads
    backgroundMusic.play();
});

// Detect when the page visibility changes (when the tab is switched or minimized)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause the music when the page is hidden (tab switched or minimized)
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;  // Reset to the beginning
        }
    } else {
        // Resume the music when the page becomes visible again
        if (backgroundMusic) {
            backgroundMusic.play();
        }
    }
});

// Pause the music when the user navigates away from the page
window.addEventListener('beforeunload', function() {
    if (backgroundMusic) {
        backgroundMusic.pause();  // Stop the music
        backgroundMusic.currentTime = 0;  // Reset to the beginning
    }
});

// Pause the music when the user navigates away from the current page or closes the tab
window.addEventListener('pagehide', function() {
    if (backgroundMusic) {
        backgroundMusic.pause();  // Stop the music
        backgroundMusic.currentTime = 0;  // Reset to the beginning
    }
});
