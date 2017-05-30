import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/file-collection.js';
import {Modules} from '../imports/modules.js';
import {Tasks} from '../imports/tasks.js';
import {Documents} from '../imports/documents.js';
import  '../imports/task.js';

import './main.html';
import '../imports/navbar.html';
import '../imports/left-menu.html';

import '../imports/task.html';


Meteor.startup(function () {
    Session.setDefault("templateName", "index")
});

Template.body.helpers({
    template_name: function(){
        return Session.get("templateName")
    }
});


Template.body.events({
    "click .home": function() {
        Session.set("templateName", "index");
    },
    "click .about": function() {
        Session.set("templateName", "about");
        console.log("about");
    },
    "click .hello": function() {
        Session.set("templateName", "hello");
        console.log("hello");
    }
    // ..
});

Template.leftMenu.helpers({
    modules: [
        { text: 'Moduł 1' },
        { text: 'Moduł 2' },
        { text: 'Moduł 3' },
        { text: 'Moduł 4' },
        { text: 'Moduł 5' },
        { text: 'Moduł 6' },
        { text: 'Moduł 7' },
    ],
    tasks() {
        return Tasks.find({});
    },
});


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        // Clear form
        target.text.value = '';
    },
});


//codeMirror
Template.EditorPage.helpers({

    "editorOptions": function() {
        return {
            lineNumbers: true,
            mode: "javascript"
        }
    },

    "editorCode": function() {
        return "Write your code here";
    }

});

Template.EditorPage.events({

    "change": function(e, t) {
       // let code = t.find("#some-id").value;
        //alert(code);
        console.log("change!");
    }

});



///documents
var DocumentsRouter, Router;

DocumentsRouter = Backbone.Router.extend({
    routes: {
        ":document_id": "main"
    },
    main: function(document_id) {
        return Session.set("document_id", document_id);
    },
    setDocument: function(document_id) {
        return this.navigate(document_id, true);
    }
});

Router = new DocumentsRouter;

Meteor.startup(function() {
    return Backbone.history.start({
        pushState: true
    });
});

Template.documentList.documents = function() {
    return Documents.find({}, {
        sort: {
            name: 1
        }
    });
};

Template.documentList.events = {
    'click #new-document': function(e) {
        var name;
        name = $('#new-document-name').val();
        if (name) {
            return Documents.insert({
                name: name,
                text: ""
            });
        }
    }
};

Template.document.events = {
    'click #delete-document': function(e) {
        return Documents.remove(this._id);
    },
    'click #edit-document': function(e) {
        return Router.setDocument(this._id);
    }
};

Template.document.selected = function() {
    if (Session.equals("document_id", this._id)) {
        return "selected";
    } else {
        return "";
    }
};

Template.documentView.selectedDocument = function() {
    var document_id, selected;
    document_id = Session.get("document_id");
    selected = Documents.findOne({
        _id: document_id
    });
    if (selected) {
        $('#document-text').val(selected.text);
        return selected;
    }
};

Template.documentView.events = {
    'keyup #document-text': function(e) {
        var mod, sel;
        sel = {
            _id: Session.get("document_id")
        };
        mod = {
            $set: {
                text: $('#document-text').val()
            }
        };
        return Documents.update(sel, mod);
    }
};


Template.addFile.events({
    'change #exampleInputFile'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        var file = event.currentTarget.files[0];
        console.log("add file "+  file.name);


        // Insert a file into the collection
        MyFiles.insert({
            file_name: file.name,
            my_file: file,
            createdAt: new Date(), // current time
        });
    },
});
