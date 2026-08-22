const supportedLanguages = new Set(['en', 'pa', 'or', 'te', 'ta', 'hi', 'bn']);

module.exports = (req, res, next) => {
    const requestedLanguage = req.cookies.language;
    const language = supportedLanguages.has(requestedLanguage) ? requestedLanguage : 'en';

    res.locals.language = language;
    res.locals.supportedLanguages = ['en', 'pa', 'or', 'te', 'ta', 'hi', 'bn'];
    next();
};