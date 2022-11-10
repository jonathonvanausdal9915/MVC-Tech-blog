const router = require('express').Router();
const {Blog, User,} = require('../models');
const withAuth = require('../utils/auth');
const {where} = require("sequelize");

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const projectData = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('posts', { 
        projects, 
        logged_in: req.session.logged_in 
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