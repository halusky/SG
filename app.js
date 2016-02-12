/**
 * Created by matthewyun on 1/20/16.
 */
'use strict';

// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    bodyParser = require('body-parser'), //Parser for reading request body
    mongoose = require( 'mongoose'), //MongoDB integration
    methodOverride = require('method-override');

// Define route variables
var routes = require('./routes/index');
//var users = require('./routes/users');
var addQuestionRoute = require('./routes/addQuestionRoute');


//Create server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Connect to database
mongoose.connect( 'mongodb://localhost/scoreGaugeDB' );

//Schemas

//Probably delete 'keywords
var Keywords = new mongoose.Schema({
    keyword: String
});

var Question = new mongoose.Schema({
    Question: String,
    AnswerOne: String,
    AnswerTwo: String,
    AnswerThree: String,
    AnswerFour: String,
    Number: Number,
    Category: String,
    Difficulty: Number,
    Correct: String, //which is the right answer. e.g. AnswerTwo
//Probably delete 'keywords
    keywords: [ Keywords ]
});

//Models
var QuestionModel = mongoose.model( 'QuestionModel', Question );

// Configure server

//parses request body and populates request.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//checks request.body for HTTP method overrides
app.use(methodOverride());


app.use('/', routes);
//Disabled AddQuestion page for now. Add back later (post MVP)
app.use('/addQuestion',addQuestionRoute);


//Where to serve static content
app.use( express.static( path.join( application_root, 'public') ) );

//Show all errors in development
//app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));


// *******************  Routes (move to separate files) *******************

app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

//Get a list of all books
app.get( '/api/questions', function( request, response ) {
    return QuestionModel.find( function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            return console.log( err );
        }
    });
});

//Get a single book by id
app.get( '/api/questions/:id', function( request, response ) {
    return QuestionModel.findById( request.params.id, function( err, book ) {
        if( !err ) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new question
app.post( '/api/questions', function( request, response ) {
    var question = new QuestionModel({
        Question: request.body.Question,
        AnswerOne: request.body.AnswerOne,
        AnswerTwo: request.body.AnswerTwo,
        AnswerThree: request.body.AnswerThree,
        AnswerFour: request.body.AnswerFour,
        Number: request.body.Number,
        Correct: request.body.Correct,
        Difficulty: request.body.Difficulty
    });
    question.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
        return response.send( question );
    });
});

//Update a question
app.put( '/api/questions/:id', function( request, response ) {
    console.log( 'Updating question ' + request.body.title );
    return QuestionModel.findById( request.params.id, function( err, question ) {
        question.Question = request.body.question;
        question.AnswerOne = request.body.AnswerOne;
        question.AnswerTwo = request.body.AnswerTwo;
        question.AnswerThree = request.body.AnswerThree;
        question.AnswerFour = request.body.AnswerFour;
        question.Correct = request.body.Correct;
        question.Difficulty = request.body.Difficulty;

        return question.save( function( err ) {
            if( !err ) {
                console.log( 'question updated' );
            } else {
                console.log( err );
            }
            return response.send( question );
        });
    });
});

//Delete a book
app.delete( '/api/questions/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return QuestionModel.findById( request.params.id, function( err, question ) {
        return question.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

//Start server
var port = 8080;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});