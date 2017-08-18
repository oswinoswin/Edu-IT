import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/collections/myFiles.js';



import  '../imports/editor-page.js';
import  '../imports/editor-page.html';
import  '../imports/collaborative.html';

import './main.html';
import '../imports/views/navbar.html';
import '../imports/views/left-menu.html';

import '../imports/task.html';
import '../imports/about.html'
import '../imports/pageContent.html'
import '../imports/routing.js'


Router.configure({
    layoutTemplate: 'ApplicationLayout'
});


Meteor.startup(function () {
    Session.setDefault("templateName", "index")
});

Template.body.helpers({
    template_name: function(){
        return Session.get("templateName")
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
    ]
});


Template.addFile.helpers({
    myfiles() {
        return MyFiles.find({}, { sort: { createdAt: -1 } });
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
    'click .delete'() {
        MyFiles.remove(this._id);
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
