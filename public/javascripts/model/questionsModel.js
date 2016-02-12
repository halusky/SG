/**
 * Created by matthewyun on 1/23/16.
 */



var app = app || {};


app.questionsModel = Backbone.Model.extend({
    defaults: {
        Question: 'Empty Question',
        AnswerOne: 'Empty AnswerOne',
        AnswerTwo: 'Empty AnswerTwo',
        AnswerThree: 'Empty AnswerThree',
        AnswerFour: 'Empty AnswerFour',
        Number: '',
        Correct: '',
        Difficulty: ''
    }


});