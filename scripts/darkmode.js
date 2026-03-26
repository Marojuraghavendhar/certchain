function initDarkMode() {
    const toggle = document.createElement('button');
    toggle.innerText = '🌓';
    toggle.style.position = 'fixed';
    toggle.style.bottom = '30px';
    toggle.style.left = '30px';
    toggle.style.zIndex = '1000';
    toggle.style.width = '50px';
    toggle.style.height = '50px';
    toggle.style.borderRadius = '50%';
    toggle.style.border = 'none';
    toggle.style.background = '#2d3748';
    toggle.style.color = '#fff';
    toggle.style.fontSize = '24px';
    toggle.style.cursor = 'pointer';
    toggle.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';

    toggle.onclick = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
    };

    document.body.appendChild(toggle);

    // Check pref
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

document.addEventListener('DOMContentLoaded', initDarkMode);
