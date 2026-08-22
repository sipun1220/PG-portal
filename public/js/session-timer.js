document.addEventListener('DOMContentLoaded', () => {
    const timer = document.querySelector('[data-session-expires]');
    const countdown = document.querySelector('[data-session-countdown]');
    if (!timer || !countdown) return;

    const expiresAt = Number(timer.dataset.sessionExpires);
    if (!Number.isFinite(expiresAt)) return;

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    let interval;

    const update = () => {
        const remaining = expiresAt - Date.now();
        countdown.textContent = formatTime(remaining);

        if (remaining <= 5 * 60 * 1000) timer.classList.add('session-warning');
        if (remaining <= 0) {
            countdown.textContent = 'Expired';
            window.clearInterval(interval);
            window.location.assign('/logout');
        }
    };

    update();
    interval = window.setInterval(update, 1000);
});