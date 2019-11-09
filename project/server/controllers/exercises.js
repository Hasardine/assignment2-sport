var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var EXERCISES_COLLECTION = "exercises";

var app = express();
app.use(bodyParser.json());

// EXERCISES API ROUTES BELOW

/*  "/api/exercises"
 *    GET: finds all exercises
 *    POST: creates a new exercise
 */

app.get("/api/exercises", function(req, res) {
    db.collection(EXERCISES_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get exercises.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  
  app.post("/api/exercises", function(req, res) {
    var newExercise = req.body;
    newExercise.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(EXERCISES_COLLECTION).insertOne(newExercise, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new exercise.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });
  
  /*  "/api/exercises/:id"
   *    GET: find exercise by id
   *    PUT: update exercise by id
   *    DELETE: deletes exercise by id
   */
  
  app.get("/api/exercises/:id", function(req, res) {
    db.collection(EXERCISES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get exercise");
      } else {
        res.status(200).json(doc);
      }
    });
  });
  
  app.put("/api/exercises/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
  
    db.collection(EXERCISES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update exercise");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });
  
  app.delete("/api/exercises/:id", function(req, res) {
    db.collection(EXERCISES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete exercise");
      } else {
        res.status(200).json(req.params.id);
      }
    });
  });