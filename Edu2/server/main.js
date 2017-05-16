import { Meteor } from 'meteor/meteor';
import '../imports/file-collection.js';
import '../imports/modules.js';
import '../imports/tasks.js';
import {Documents} from '../imports/documents.js';

Meteor.startup(function() {
    if (Documents.find().count() === 0) {
        return Documents.insert({
            name: "Sample doc",
            text: "Write here..."
        });
    }
});
