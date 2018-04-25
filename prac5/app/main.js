require.config({
    paths: {
        'backbone': '../lib/backbone-min',
        'underscore': '../lib/underscore-min',
        'jquery': '../lib/jquery-3.2.1.min',
        'marionette': '../lib/backbone.marionette.min',
        'backbone.radio': '../lib/backbone.radio',
        "text": '../lib/text',
        "todoModel": "./models/todo",
        "todoCollection": "./collections/todos",
        "todoView": "./views/layout"
    }
});

require([
    'marionette',
    'backbone',
    'todoModel',
    'todoView'
], function(Marionette, Backbone, TodoModel, TodoView) {

    var initialData = [
        {assignee: 'Scott', text: 'Write a book about Marionette'},
        {assignee: 'Andrew', text: 'Do some coding'}
    ];

    var App = Marionette.Application.extend({
        region: '#app-hook',
        initialize: function() {
            console.log("App has STARTED!!");
        },

        onStart: function(options) {
            var todo = new TodoView({
                collection: new Backbone.Collection(options.initialData),
                model: new TodoModel()
            });
            this.showView(todo);
        }
    });

    var app = new App();
    app.start({initialData: initialData});
});


