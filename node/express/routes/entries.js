const Entry = require('../model/entry');
exports.list = (req, res, next) => {
    Entry.getRange(0, -1, (err, entries) => {
        if (err) {
            return next(err);
        }
        res.render('entries', {
            title: 'Entries',
            entries: entries
        })
    })
}

exports.form = (req, res) => {
    res.render('post', { title: 'Post'});
};

exports.submit = (req, res, next) => {
    const data = req.body.entry;
    const user = req.locals.user;
    const username = user ? user.name : null;
    if (!data.title) {
        res.error('Title is required');
        res.redirect('back');
        return;
    }

    if (data.title.length < 4) {
        res.error('Titlee must be longer than 4 characters');
        res.redirect('back');
        return;
    }
    
    const entry = new Entry({
        username: username,
        title: data.title,
        body: data.body
    });
    entry.save(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};