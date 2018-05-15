var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

app.use(bodyParser.json());
app.use(express.static( __dirname + '/myFirstAngularApp/dist/myFirstAngularApp' ));

mongoose.connect('mongodb://localhost/restfulAPI');

var TaskSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    completed: {type: Boolean, default: false}
}, {timestamps: true});


mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

//retrieves all the tasks
app.get('/', function(req, res){
    Task.find({}, function(err, allTask){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: allTask})
        }
    })
})

//retrieves a task by ID
app.get('/task/:id', function(req, res){
    Task.find({_id: id}, function(err, task){
        if(err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        }
    })
})

//creates a task
app.post('/task', function(req, res){
    Task.create({title: req.body.title, description: req.body.description, completed: req.body.completed}, function(err, task){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        }
    })
})

//deletes a task
app.delete('/task/:id', function(req, res){
    Task.findByIdAndRemove(req.params.id, function(err, task){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        } 
    })
})


//updates a task
app.put('/task/:id', function(req, res){
    Task.findByIdAndUpdate(req.params.id, { $set: {title: req.body.title, description: req.body.description, completed: req.body.completed}}, function(err, task){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        }
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})