import { Template } from 'meteor/templating';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/collections/myFiles.js';
import {Modules} from '../imports/collections/modules.js';
import {Roles} from '../imports/collections/roles.js';
import {YourFileCollection} from '../imports/collections/yourFileCollection.js';



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
        var yourFile = new FS.File(file);
        YourFileCollection.insert(yourFile, function (err, fileObj) {
            console.log("callback for the insert, err: ", err);
            if (!err) {
                console.log("inserted without error");
            }
            else {
                console.log("there was an error", err);
            }
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

//---------------------fileUpload Again-------------------
Meteor.subscribe("fileUploads");
Template.fileList.helpers({
    theFiles: function () {
        return YourFileCollection.find();
    }
});

Template.fileList.events({
    'click #deleteFileButton ': function (event) {
        console.log("deleteFile button ", this);
        YourFileCollection.remove({_id: this._id});
    },
    'change .your-upload-class': function (event, template) {
        console.log("uploading...")
        FS.Utility.eachFile(event, function (file) {
            console.log("each file...");
            var yourFile = new FS.File(file);
            YourFileCollection.insert(yourFile, function (err, fileObj) {
                console.log("callback for the insert, err: ", err);
                if (!err) {
                    console.log("inserted without error");
                }
                else {
                    console.log("there was an error", err);
                }
            });
        });
    }
});



Template.moduleContent.helpers({
    number() {
        let current = Session.get("currentModule");
        console.log("current " + current);
        return Modules.findOne({number: current})['number'];
    },
    moduleText() {
        let current = Session.get("currentModule");
        let toDisp = Modules.findOne({number: current})['text'];
        console.log("Should be displayed: " + toDisp);
        return toDisp;
    },
});



Template.leftMenu.helpers({
    /*modules() {
        return Modules.find({}, {sort: {number: 1}});
    },*/


    modules: [

        { number: '1' },
        { number: '2' },
        { number: '3' },
        { number: '4' },
        { number: '5' },
        { number: '6' },
        { number: '7' },
        { number: '8' },
        { number: '9' },
        { number: '10' },
        { number: '11' },
        { number: '12' },

    ],
});
