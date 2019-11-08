var express = require('express');
var router = express.Router();

var ctrlExercises = require('../controllers/exercises');
var ctrlWorkouts = require('../controllers/workouts');
var ctrlLogs = require('../controllers/logs');


//workouts
router.get('/workouts', ctrlWorkouts.workoutsList);
router.post('/workouts', auth, ctrlWorkouts.workoutsCreate);
router.get('/workouts/:workoutid', ctrlWorkouts.workoutsReadOne);
router.put('/workouts/:workoutid', auth, ctrlWorkouts.workoutsUpdateOne);
router.delete('/workouts/:workoutid', auth, ctrlWorkouts.workoutsDeleteOne);

//exercises
router.post('/workouts/:workoutid/exercises', auth, ctrlExercises.exercisesCreate);
router.get('/workouts/:workoutid/exercises/:exerciseid', ctrlExercises.exercisesReadOne);
router.put('/workouts/:workoutid/exercises/:exerciseid', auth, ctrlExercises.exercisesUpdateOne);
router.delete('/workouts/:workoutid/exercises/:exerciseid', auth, ctrlExercises.exercisesDeleteOne);

//logs
router.post('/workouts/:workoutid/logs', ctrlLogs.logsCreate);


module.exports = router;