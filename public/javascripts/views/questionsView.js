/**
 * Created by matthewyun on 1/23/16.
 */

var app = app || {};


app.questionsView = Backbone.View.extend({
//    el: $('#testQuestions'),
    tagName: 'div',
    className: 'questionContainer',
    template: $('#testTemplate').html(),

    initialize: function(){

    },

    events: {
      // should clicking next button go here?

    },

    render: function () {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        return this;

    }

});