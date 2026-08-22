const { createUserClient } = require('../utils/supabase.js');

module.exports.showMyGrievances = async (req, res) => {
    const supabase = createUserClient(req.cookies['sb-access-token']);
    const { data: grievances, error } = await supabase
        .from('raw_grievances')
        .select('submission_id, description, location, grievance_type, grievance_category, subcategory, image_path, video_path, voice_path, created_at, user_id')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to load grievances:', error.message);
        return res.status(500).render('show.ejs', {
            grievances: [],
            error: 'Unable to load your grievances.'
        });
    }

    res.render('show.ejs', { grievances });
};

module.exports.createGrievance = async (req, res) => {
    const {
        category,
        type,
        description,
        state,
        district,
        block,
        latitude,
        longitude
    } = req.body;

    const location = [state, district, block, latitude, longitude]
        .filter(Boolean)
        .join(', ');

    const supabase = createUserClient(req.cookies['sb-access-token']);
    const { error } = await supabase.from('raw_grievances').insert({
        submission_id: `ID-${Date.now()}`,
        description,
        location,
        grievance_type: type,
        grievance_category: category,
        user_id: req.user.id
    });

    if (error) {
        console.error('Failed to create grievance:', error.message);
        return res.status(400).send('Unable to submit grievance.');
    }

    res.redirect('/show');
};