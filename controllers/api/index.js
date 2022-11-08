const router = require('express').Router();
const userRoute = require('./userRoute');
const workoutRoute = require('./workoutRoute');


router.use('/users', userRoute);
router.use('/blogs', workoutRoute);


module.exports = router;