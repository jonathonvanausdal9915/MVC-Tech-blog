const router = require('express').Router();
const userRoute = require('./userRoute');
const workoutRoute = require('./workoutRoute');
const goalRoute = require('./goalRoute');
const recipeRoute = require('./recipeRoute');

router.use('/users', userRoute);
router.use('/workout', workoutRoute);
router.use('/goal', goalRoute);
router.use('/recipe', recipeRoute);

module.exports = router;