import { Template } from 'meteor/templating';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/collections/myFiles.js';
import {Modules} from '../imports/collections/modules.js';
import {Roles} from '../imports/collections/roles.js';



import  '../imports/editor-page.js';
import  '../imports/editor-page.html';
import  '../imports/collaborative.html';

import './main.html';
import './main.js';

import '../imports/views/navbar.html';
import '../imports/views/left-menu.html';

import '../imports/task.html';
import '../imports/about.html'
import '../imports/pageContent.html'
import '../imports/routing.js'

import '../imports/module-content.html';

import '../imports/teacherPanel.html';
import '../imports/teacherPanel.js';

//let userId = this.userId;

//Roles.addUsersToRoles( userId, [ 'teacher' ] );



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
    modules() {
        return Modules.find({}, {sort: {number: 1}});
    },
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
        console.log("add file "+  file.name + " user " + Meteor.userId());


        // Insert a file into the collection
        MyFiles.insert({
            file_name: file.name,
            my_file: file,
            createdAt: new Date(), // current time
            user_id: Meteor.userId(),
        });
    },
    'click .delete'() {
        MyFiles.remove(this._id);
    },
});

Template.addFileToModule.events({
    'change #exampleInputFile'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        var file = event.currentTarget.files[0];
        console.log("add file "+  file.name + " user " + Meteor.userId());


        // Insert a file into the collection
        MyFiles.insert({
            file_name: file.name,
            my_file: file,
            createdAt: new Date(), // current time
            user_id: Meteor.userId(),
            module_no: Session.get("currentModule"),
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
        console.log("key");

    }
};

Template.registerHelper('isTeacher', () => {
    return Roles.findOne({"user": Meteor.userId()})['role'] === "teacher";
});
