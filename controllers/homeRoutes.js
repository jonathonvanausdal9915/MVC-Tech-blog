const router = require('express').Router();
const {Blog, User,} = require('../models');
const withAuth = require('../utils/auth');
const {where} = require("sequelize");

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['user_name'],
            },],
        });
        const blogs = blogData.map((blog) => blog.get({plain: true}));
        res.render('home', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log(req.session);

        const bloglist = await Blog.findAll({where:{user_id: req.session.user_id}}, {
        include: [{model: Blog}],});
        res.render('dashboard', {
            bloglist,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});







router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
})

module.exports = router;