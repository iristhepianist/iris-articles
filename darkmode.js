// Apply dark mode immediately if stored preference exists (prevents flash)
(function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark-mode');
        if (document.body) {
            document.body.classList.add('dark-mode');
        }
    }
})();

// Dark mode toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
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

// Ensure dark mode is applied to body when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    updateToggleButton();
});
