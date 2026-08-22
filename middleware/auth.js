const supabase = require('../utils/supabase.js');

const getTokenExpiry = (accessToken) => {
    try {
        const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString('utf8'));
        return Number.isFinite(payload.exp) ? payload.exp * 1000 : null;
    } catch (error) {
        return null;
    }
};

module.exports.loadUser = async (req, res, next) => {
    const accessToken = req.cookies['sb-access-token'];

    req.user = null;
    res.locals.currentUser = null;
    res.locals.sessionExpiresAt = null;

    if (accessToken) {
        const { data } = await supabase.auth.getUser(accessToken);
        req.user = data.user || null;
        res.locals.currentUser = req.user;
        if (req.user) res.locals.sessionExpiresAt = getTokenExpiry(accessToken);
    }

    next();
};

module.exports.requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    next();
};
