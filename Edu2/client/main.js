import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/accounts-config.js';
import {MyFiles} from '../imports/file-collection.js';

import './main.html';

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
