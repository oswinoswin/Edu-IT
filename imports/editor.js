import '../imports/collections/editor-files.js';
import '../imports/editor.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import {EditorFiles} from "./collections/editor-files"


//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 5000;  //time in ms (5 seconds)

//user is "finished typing," do something
function doneTyping (target) {
    //save changes to database
    console.log("-----------------DONE TYPING! " + target);
    let currentE = Session.get("currentEditor");
    let id = EditorFiles.findOne({number:currentE})['_id'];
    EditorFiles.update({_id:id},{number:currentE, text:target});

}

Template.editor.onRendered(function(){
    var textPlace = this.find('#text-place');
    textPlace.contentEditable=true;
    textPlace.focus();
    }
);


Template.editor.events({
    'keyup' : function (event) {
        event.preventDefault();
        // Get value from form element
        const target = $(event.currentTarget).text();
        console.log(target);

        clearTimeout(typingTimer);
        if (target) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval, target);
        }
    },
    'onclick div' : function (event) {
        console.log('click');
        console.log(Session.get('currentEditor'));
    }
})

Template.editor.helpers({
    number() {
        let currentE = Session.get("currentEditor");
        console.log("currentE " + currentE);
        return EditorFiles.findOne({number: currentE})['number'];
    },
    editorText() {
        let currentE = Session.get("currentEditor");
        return EditorFiles.findOne({number: currentE})['text'];
    },
});


Meteor.methods({
    'tasks.insert'(EditorText) {
        //check(text, String);

        // Make sure the user is logged in before inserting a task
       /* if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }*/

        EditorFiles.insert({
            EditorText,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
});