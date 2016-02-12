/**
 * Created by matthewyun on 1/23/16.
 */

var app = app || {};


app.questionsCollection = Backbone.Collection.extend({
    model: app.questionsModel,
    url: '/api/questions'

});


