const router = require('express').Router();
const {Workout, User} = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        // Add the date to the calendar / dashboard
        req.body.user_id = req.session.user_id;
        const newWorkout = await Workout.create(req.body);
        req.session.save(() => {
            req.session.user_id = newWorkout.user_id;
            req.session.logged_in = true;
            res.status(200).json(newWorkout);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;