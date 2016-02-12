/**
 * Created by matthewyun on 2/1/16.
 */

var app = app || {};

app.addQuestionView = Backbone.View.extend({
    el: $('#addQuestion'),

    initialize: function() {
        this.collection = new app.questionsCollection();
        this.collection.fetch();
    },

    events: {
        'click #btnAddQuestion': 'addQuestion',

        // remove 'errorPlaceholder' class
        'focus .errorPlaceholder' : 'removeClass'
    },

    addQuestion: function(e) {
        e.preventDefault();

        console.log('AddQuestion triggered');

        // *** INPUT VERIFICATION
        // check for empty fields. Populate with red error message
        var errors = 0;
        $('#addQuestion fieldset').children('input').each(function(i, el) {
            if ($(el).val() == '') {
                el.placeholder = '*PLEASE FILL OUT';

                $(el).addClass('errorPlaceholder');
                errors ++;
            }
        });

        // check for question w/ same number
        var numberInput = $('#Number').val();

        if (this.collection.find(function(model){
            return model.get('Number') == numberInput;
        }, this)){
            errors ++;
            alert('Number value already used.');
        }

        // If no errors, use input data to create new collection
        if (errors == 0) {
            var newQuestion = {};
            $('#addQuestion fieldset').children('input').each(function (i, el) {
                newQuestion[el.id] = $(el).val();
            });
            console.log(newQuestion);
            this.collection.create(newQuestion);
        }
    },

    removeClass: function(e){
        e.preventDefault();
        $(e.target).toggleClass('errorPlaceholder');

    }

});