import '../imports/collections/editor-files.js';
import '../imports/editor.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import {EditorFiles} from "./collections/editor-files"


//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 3000;  //time in ms (5 seconds)

//user is "finished typing," do something
function doneTyping () {
    console.log("-----------------DONE TYPING!");
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
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
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