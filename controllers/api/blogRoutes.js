const router = require('express').Router();
const {Blog, User} = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        
        req.body.user_id = req.session.user_id;
        const newBlog = await Blog.create(req.body);
        req.session.save(() => {
            req.session.user_id = newBlog.user_id;
            req.session.logged_in = true;
            res.status(200).json(newBlog);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;