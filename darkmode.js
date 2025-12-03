// Dark mode toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateToggleButton();
}

function updateToggleButton() {
    const button = document.querySelector('.dark-mode-toggle');
    if (button) {
        if (document.body.classList.contains('dark-mode')) {
            button.textContent = 'LIGHT MODE';
        } else {
            button.textContent = 'DARK MODE';
        }
    }
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Update button after page loads
document.addEventListener('DOMContentLoaded', function() {
    updateToggleButton();
});
