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
        res.render('posts', {
            blogs,
            logged_in:true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/login', async (req, res) => {
    try {
        res.render('login', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', {
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;