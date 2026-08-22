document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('[data-language-selector]');
    const language = document.body.dataset.language || 'en';
    if (!selector) return;

    selector.value = language;
    selector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        document.cookie = `language=${selectedLanguage}; path=/; max-age=31536000; SameSite=Lax`;

        if (selectedLanguage !== 'en') {
            document.cookie = `googtrans=/en/${selectedLanguage}; path=/; max-age=31536000; SameSite=Lax`;
        } else {
            document.cookie = 'googtrans=; path=/; max-age=0; SameSite=Lax';
        }
        window.location.reload();
    });

    window.googleTranslateElementInit = () => {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,pa,or,te,ta,hi,bn',
            autoDisplay: false
        }, 'google_translate_element');
    };

    const widget = document.createElement('div');
    widget.id = 'google_translate_element';
    widget.hidden = true;
    document.body.appendChild(widget);

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
});
