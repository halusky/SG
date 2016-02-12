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
        'click #btnAddQuestion': 'addQuestion'
//        // remove 'errorPlaceholder' class
//        'focus .errorPlaceholder' : 'removeClass'
    },

//   addQuestion: function(e) {
//       e.preventDefault();
//
//       // *** INPUT VERIFICATION
//       // check for empty fields. Populate with red error message
//       var blanks = 0;
//       $('#addQuestion fieldset').children('input').each(function(i, el) {
//           if ($(el).val() == '') {
//               el.placeholder = '*PLEASE FILL OUT';
//
//               $(el).addClass('errorPlaceholder');
//               blanks += 1;
//           }
//       });
//
//       // If no errors, use input data to create new collection
//       if (blanks == 0) {
//           var newQuestion = {};
//           $('#addQuestion fieldset').children('input').each(function (i, el) {
//               newQuestion[el.id] = $(el).val();
//           });
//           this.collection.create(newQuestion);
//       }
//
//   },

//    removeClass: function(e){
//        e.preventDefault();
//       $(e.target).toggleClass('errorPlaceholder');
//
//    },

    render: function() {
        console.log('render running');
//        console.log(this.collection);
//
//        var test1 = this.collection.where(
//            {AnswerThree: 'Sugar'});
//        console.log(test1);

        var test2 = this.collection.find(function(model) {
        return model.get('Number') == 2; }
        , this);

        console.log(test2);

        var i = 2;

        this.renderQuestion( test2);
        i ++;

        console.log(i);
// To render each item in collection at once
//        this.collection.each(function( item ) {
//            this.renderQuestion( item );
//        }, this );

    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderQuestion: function( item ) {
        console.log('renderQuestion running');

//        if(item.attributes.AnswerOne == 'Lassi') {
//            var questionView = new app.questionsView({
//                model: item
//            });
//
//            this.$el.append(questionView.render().el);
//        }

        var questionView = new app.questionsView({
            model: item
        });

        this.$el.append(questionView.render().el);
    }


});