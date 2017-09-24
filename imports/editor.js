import '../imports/collections/editor-files.js';
import '../imports/editor.html';
import { Template } from 'meteor/templating';
import '../client/main.css';


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
    }
})