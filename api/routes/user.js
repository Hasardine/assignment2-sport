var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user');

// view a list of workouts
router.get('/', ctrlUser.renderWorkoutList)

// adding a workout
router.post('/', ctrlUser.addWorkout)

// removing a workout
router.get('/:workout_id', ctrlUser.removeWorkout)

// view list of exercises for a given workout
router.get('/:workout_id/exercises', ctrlUser.renderExerciseList)

// add an exercise to a given workout
router.post('/:workout_id/exercises', ctrlUser.addExercise)

// delete a specific exercise
router.get('/:workout_id/:exercise_id', ctrlUser.deleteExercise)

module.exports = router;
