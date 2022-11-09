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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts', withAuth, async (req, res) => {
    try {
        console.log(req.session);

        const bloglist = await Blog.findAll({where:{user_id: req.session.user_id}}, {
        include: [{model: Blog}],});
        res.render('posts', {
            bloglist,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get('/blogs', withAuth, async (req, res) => {
    try {
        console.log(req.session);
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Blog}]
        });
        const user = userData.get({plain: true});
        res.render('posts', {
            ...user,
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

router.get('/login', async (req, res) => {
    try {
        

        
        res.render('login', {
            
            
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get('/dashboard', async (req, res) => {
    try {
        

        
        res.render('dashboard', {
            
            
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;