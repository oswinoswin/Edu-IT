import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/file-collection.js';
import {Modules} from '../imports/modules.js';
import {Tasks} from '../imports/tasks.js';


import  '../imports/task.js';
import  '../imports/editor-page.js';

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
    },

    "click .editor-page": function() {
        Session.set("templateName", "editorPage");
        console.log("editor page");
    },

    "click .add-file": function() {
        Session.set("templateName", "addFile");
        console.log("add file");
    }
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

Template.EditorPage.rendered = function() {
    var editor = CodeMirror.fromTextArea(this.find("#myTextarea"), {
        lineNumbers: true,
        mode: "javascript" // set any of supported language modes here
    });
}

Template.EditorPage.events =  {
    'keyup #myTextarea': function(e) {
        console.log("<3 <3");

    }
};
