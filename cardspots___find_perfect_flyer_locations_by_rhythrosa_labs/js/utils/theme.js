export function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        );
    });
}