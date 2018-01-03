//-------------------BEGIN Node/Express Setup--------------------
var fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var http = require('http');
var Classroom = require("./lib/classroom");

var serverPort = 9007;
var server = http.createServer(app);
//--------------END Node/Express Setup---------------------------

//--------------------BEGIN Firebase----------------------
var firebase = require("firebase-admin");

var serviceAccount = require("./key/benkyohr-e00dc-firebase-adminsdk-125v5-d1fdc86be0.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://benkyohr-e00dc.firebaseio.com"
});

// open database
var database = firebase.database();
//--------------------------END Firebase-----------------------------------

app.use(cors());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/transcribed_files'));

// /************************** Importing Files/Fucntions ******************/
// var Users = require("./lib/user");
// var Assessments = require("./lib/assessments");
// var Classroom = require("./lib/classroom");
// var Students = require("./lib/student");

// /***************************** Routes ****************************/
// app.use("/", express.static(__dirname));
// app.get('/assessment/get', Assessments.getReleventAssessment)
// app.get('/assessment/update', Assessments.updateReleventAssessment)
// app.get('/assessment/getSortedData', Assessments.getAssessmentThroughSort)
// app.get('/assessment/pushData', Assessments.pushReleventAssessment)
// // app.get('/assessment/delete', Assessments.deleteReleventAssessment)


app.all('/teacher/getToken', Classroom.getGoogleClassOAuthToken);
app.all('/teacher/importClassroom', Classroom.getGoogleClassRoomData);

// /***************************** Student Routes ****************************/
// app.get('/student/sendData', Students.sendTranscribedAssessment);


server.listen(serverPort, function(){
  console.log('HTTP server up and running at %s port', serverPort);
});