import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/file-collection.js';
import {Modules} from '../imports/modules';

import './main.html';


Template.body.helpers({
    modules: [
        { text: 'Moduł 1' },
        { text: 'Moduł 2' },
        { text: 'Moduł 3' },
        { text: 'Moduł 4' },
        { text: 'Moduł 5' },
        { text: 'Moduł 6' },
        { text: 'Moduł 7' },
    ],
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
    'onChange .new-task'(event) {
// Prevent default browser form submit
        event.preventDefault();

// Get value from form element
        const file = event.target;
        //const file = target.text.value;

// Insert a task into the collection
        MyFiles.insert({
            file,
            createdAt: new Date(), // current time
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
        return "Code to show in editor";
    }

});

Template.EditorPage.events({

    "some event": function(e, t) {
        let code = t.find("#some-id").value;
        alert(code);
    }

});

