var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";
var EXERCISES_COLLECTION = "exercises";
var WORKOUTS_COLLECTION = "workouts";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

/*// Connecting DB like in assignment1
mongoose.connect('mongodb+srv://user1:1234@cluster0-g03ww.mongodb.net/assignment1?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;*/

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// USERS API ROUTES

/*  "/api/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

app.get("/api/users", function(req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/users", function(req, res) {
  var newUser = req.body;
  newUser.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/users/:id"
 *    GET: find user by id
 *    PUT: update user by id
 *    DELETE: deletes user by id
 */

app.get("/api/users/:id", function(req, res) {
  db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/users/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/users/:id", function(req, res) {
  db.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

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
