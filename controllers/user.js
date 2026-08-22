const supabase = require('../utils/supabase.js');

module.exports.signupForm = (req, res) => {
    res.render('signup.ejs');
};

module.exports.signup = async (req, res) => {
    const { email, username, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
            emailRedirectTo: `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback`
        }
    });

    if (error) {
        return res.status(400).render('signup.ejs', { error: error.message });
    }

    if (!data.session) {
        return res.render('signup.ejs', {
            message: 'Account created. Check your email to confirm your account, then log in.'
        });
    }

    res.cookie('sb-access-token', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.session.expires_in * 1000
    });
    res.cookie('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 3600 * 1000
    });

    res.redirect('/dashboard');
};

module.exports.authCallback = async (req, res) => {
    const { token_hash: tokenHash, type = 'signup' } = req.query;

    if (!tokenHash) {
        return res.render('auth-callback.ejs');
    }

    const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type
    });

    if (error || !data.session) {
        return res.status(400).render('login.ejs', {
            error: error ? error.message : 'The confirmation link has expired.'
        });
    }

    res.cookie('sb-access-token', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.session.expires_in * 1000
    });
    res.cookie('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 3600 * 1000
    });

    res.redirect('/dashboard');
};

module.exports.createSession = async (req, res) => {
    const { access_token: accessToken, refresh_token: refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
        return res.status(400).json({ error: 'Missing session tokens.' });
    }

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
        return res.status(401).json({ error: 'Invalid session.' });
    }

    res.cookie('sb-access-token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 1000
    });
    res.cookie('sb-refresh-token', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 3600 * 1000
    });

    res.sendStatus(204);
};

module.exports.loginForm = (req, res) => {
    res.render('login.ejs');
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(401).render('login.ejs', { error: error.message });
    }

    res.cookie('sb-access-token', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.session.expires_in * 1000
    });
    res.cookie('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 3600 * 1000
    });

    res.redirect('/dashboard');
};

module.exports.logout = (req, res) => {
    res.clearCookie('sb-access-token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });
    res.clearCookie('sb-refresh-token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    res.redirect('/login');
};