const router = require('express').Router();
const userRoute = require('./userRoute');
const blogRoutes = require('./blogRoutes');


router.use('/users', userRoute);
router.use('/blogs', blogRoutes);


module.exports = router;