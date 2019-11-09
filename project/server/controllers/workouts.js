var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var WORKOUTS_COLLECTION = "workouts";

var app = express();
app.use(bodyParser.json());

// WORKOUTS API ROUTES BELOW

/*  "/api/workouts"
 *    GET: finds all workouts
 *    POST: creates a new workout
 */

app.get("/api/workouts", function(req, res) {
    db.collection(WORKOUTS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get workouts.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  
  app.post("/api/workouts", function(req, res) {
    var newWorkout = req.body;
    newWorkout.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(WORKOUTS_COLLECTION).insertOne(newWorkout, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new workout.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });
  
  /*  "/api/workouts/:id"
   *    GET: find workout by id
   *    PUT: update workout by id
   *    DELETE: deletes workout by id
   */
  
  app.get("/api/workouts/:id", function(req, res) {
    db.collection(WORKOUTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get workout");
      } else {
        res.status(200).json(doc);
      }
    });
  });
  
  app.put("/api/workouts/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
  
    db.collection(WORKOUTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update workout");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });
  
  app.delete("/api/workouts/:id", function(req, res) {
    db.collection(WORKOUTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete workout");
      } else {
        res.status(200).json(req.params.id);
      }
    });
  });