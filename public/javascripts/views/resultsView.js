/**
 * Created by matthewyun on 2/9/16.
 */


var app = app || {};

app.resultsView = Backbone.View.extend({
    tagName: 'div',
    className: 'resultsContainer',
    template: $('#resultsTemplate').html(),



    render: function(){
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        return this;
    }

    

});