/**
 * Created by matthewyun on 1/25/16.
 */


// PROBABLY DELETE THIS FILE

var app = app || {};


app.newQuestionView = Backbone.View.extend({
    el: $('#addQuestion'),

    events: {
        'click #btnAddQuestion': 'addQuestion'
    },

    addQuestion: function(e){
//        e.preventDefault();

        console.log('test');


    }

//   addQuestion: function(e){
//       e.preventDefault();
//
//       var newQuestion = {};
//
//       $('#addQuestion fieldset').children('input').each(function(i, el) {
//
//           if ($(el).val() != '') {
//               alert(el.id);
////               newQuestion[el.id]
//           } else {
//               alert('Please fill out each box')
//           }
//       })
//   }

});