var express = require('express');
var User = require('../models/user');
var allExercises = require('../exercises');

// view a list of workouts
module.exports.renderWorkoutList = function (req, res) {
  res.render('workouts', {user:req.user,workouts:req.user.workoutList});
}

// adding a workout
module.exports.addWorkout = function (req,res) {
  var list = req.user.workoutList;
  list.push({
    name: req.body.workout,
    exerciseList: []
  });
  User.findByIdAndUpdate(req.user._id, {workoutList: list},{new:true}, (err,updatedUser) => {
    if (err) { console.log(err);}
    res.render('workouts', {user:req.user,workouts:updatedUser.workoutList});
  })
}

// removing a workout
module.exports.removeWorkout = function (req,res) {
  var workouts = req.user.workoutList;
  var chosenWorkout = workouts.filter(workout => workout._id == req.params.workout_id)[0];
  var idx = workouts.indexOf(chosenWorkout);
  workouts.splice(idx, 1);
  User.findByIdAndUpdate(req.user._id, {workoutList: workouts},{new:true}, (err,updatedUser) => {
    if (err) { console.log(err);}
    res.render('workouts', {user:req.user,workouts:updatedUser.workoutList});
  });
}

// view list of exercises for a given workout
module.exports.renderExerciseList =  function (req, res, next) {
  var foundWorkout = req.user.workoutList.filter(workout => workout._id == req.params.workout_id)[0];
  res.render('exercises',{user: req.user, workout: foundWorkout, availableExercises: allExercises});
}

// add an exercise to a given workout
module.exports.addExercise = function (req,res) {
  var chosenExercise = allExercises.filter(exercise => exercise.name == req.body.addedExercise)[0];
  var workouts = req.user.workoutList;
  workouts.filter(workout => workout._id == req.params.workout_id)[0].exerciseList.push(chosenExercise);
  User.findByIdAndUpdate(req.user._id, {workoutList: workouts},{new:true}, (err,updatedUser) => {
    if (err) { console.log(err);}
    res.render('exercises', {availableExercises: allExercises,user:req.user,workout:updatedUser.workoutList.filter(workout => workout._id == req.params.workout_id)[0]});
  }); 
}

// delete a specific exercise
module.exports.deleteExercise = function (req, res) {
  var workouts = req.user.workoutList;
  var workout = workouts.filter(workout => workout._id == req.params.workout_id)[0];
  var chosenExercise = workout.exerciseList.filter(exercise => exercise._id == req.params.exercise_id)[0];
  var idx = workout.exerciseList.indexOf(chosenExercise);
  workouts.filter(workout => workout._id == req.params.workout_id)[0].exerciseList.splice(idx,1);
  User.findByIdAndUpdate(req.user._id, {workoutList: workouts},{new:true}, (err,updatedUser) => {
    if (err) { console.log(err);}
    res.render('exercises', {availableExercises: allExercises,user:req.user,workout:updatedUser.workoutList.filter(workout => workout._id == req.params.workout_id)[0]});
  });
}