/**
 * Created by matthewyun on 1/25/16.
 */

var app = app || {};

app.TestView = Backbone.View.extend({

    el: $('#testQuestions'),

    initialize: function() {
        this.collection = new app.questionsCollection();
        this.collection.fetch({reset:true});
        //why render on initialize? collection is still empty
//        this.render();


        this.listenTo( this.collection, 'add', this.renderQuestion);
        this.listenTo( this.collection, 'reset', this.render );
    },

    events: {
        'click #btnAddQuestion': 'addQuestion',
        'click #btnSubmit': 'submitAnswer'

//        // remove 'errorPlaceholder' class
//        'focus .errorPlaceholder' : 'removeClass'
    },

//******* Submits answer, generates number of next question, then calls render.
    submitAnswer: function(e){

        e.preventDefault();

// *** Get values necessary to determine next number. Result, level, difficulty, used numbers.

       //get values of answers, number and difficulty
        var answerUser = ''; // declare user's answer here. value assigned below
        var number = $('#questionForm .question').attr('id');
        var answerCorrect = $('#correctAnswer').text().trim();
        var difficulty = $('#Difficulty').text().trim();

        //verify an answer is selected and then assign value to answerUser
        $('#test fieldset').children('input').each(function(i, el){
            if (el.checked){
                answerUser = el.id;
            }
        });

        //RESULT. determine if answer is correct
        if (answerUser === answerCorrect){
            var result = 'correct';
        } else {var result = 'incorrect';}

        //LEVEL. determine next level based on result
        var level = JSON.parse(sessionStorage.getItem('level')) || 5; // starting level is 5

        if (result == 'correct') {
            level++;
        } else if (level !=1){
            level --;
        }
        sessionStorage.setItem('level', level); // save new level to sessionStorage

        //save answer to sessionStorage
        var resultsTest = JSON.parse(sessionStorage.getItem('answers')) || [];

        if (answerUser != ''){
            var resultsQuestion = {};
            resultsQuestion['Number'] = number;
            resultsQuestion['Result'] = result;
            resultsQuestion['Difficulty'] = difficulty;

            resultsTest.push(resultsQuestion);

        } else alert('Please choose an answer');

        // Save answers
//        sessionStorage.setItem(number, JSON.stringify(resultsQuestion));
        sessionStorage.setItem('answers',JSON.stringify(resultsTest));

        // Save array of numbers used
        var numbersSaved = JSON.parse(sessionStorage.getItem('numbersUsed')) || []; //convert string back to array
        numbersSaved.push(number);
        sessionStorage.setItem('numbersUsed', JSON.stringify(numbersSaved));// stringify array

        //USED NUMBERS. Get array of numbers used from sessionStorage.
        var numbersUsed = JSON.parse(sessionStorage.getItem('numbersUsed'));

        //FILTERED LIST. Create list of questions not already used
        var filteredList = this.collection.filter(function(model){
            return numbersUsed.indexOf(JSON.stringify(model.get('Number'))) < 0
        });

// *** Use level to select nextNumber from filteredList
        var length = filteredList.length;
        var i = 0;
        while (i < length) {
            if (level > 0 && level <= 5) {
                if (filteredList[i].attributes.Difficulty === 1) {
                    var nextNumber = filteredList[i].attributes.Number;
                    break;
                } else i += 1;
            } else if (level > 5 && level <= 10) {
                if (filteredList[i].attributes.Difficulty === 2) {
                    var nextNumber = filteredList[i].attributes.Number;
                    break;
                } else i += 1;
            } else if (level > 10) {
                if (filteredList[i].attributes.Difficulty === 3) {
                    var nextNumber = filteredList[i].attributes.Number;
                    break;
                } else i += 1;
            }
        }

        // kickoff render or submitTest depending on if last answer
        if (numbersUsed.length >= 15) {
            this.submitTest();
        } else {
            this.render(nextNumber);
        }

    },


// renders result page
    submitTest: function(){
        console.log('submitTest running');

        var resultsView = new app.resultsView({
            // model?
        });

        this.$el.append(resultsView.render().el);

    },

    render: function(nextNumber) {
        console.log('render running');
        //Delete previous question
        this.$el.empty();

        if (typeof(nextNumber) === 'number'){
            var i = nextNumber;
        } else {var i = 1;}


        var question = this.collection.find(function(model) {
        return model.get('Number') == i; }
        , this);

        this.renderQuestion(question);

    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderQuestion: function( item ) {
        console.log('renderQuestion running');

        var questionView = new app.questionsView({
            model: item
        });

        this.$el.append(questionView.render().el);
    }


});