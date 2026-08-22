const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_KEY must be set in .env');
}

const clientOptions = {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
    }
};

const supabase = createClient(supabaseUrl, supabaseKey, clientOptions);

const createUserClient = (accessToken) => createClient(supabaseUrl, supabaseKey, {
    ...clientOptions,
    global: {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
});

module.exports = supabase;
module.exports.createUserClient = createUserClient;
