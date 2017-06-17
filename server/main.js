import { Meteor } from 'meteor/meteor';
import '../imports/collections/modules.js';
import '../imports/collections/tasks.js';
import {Documents} from '../imports/collections/documents.js';
import {MyFiles} from '../imports/file-collection.js';

Meteor.startup(function() {
    if (Documents.find().count() === 0) {
        return Documents.insert({
            name: "Sample doc",
            text: "Write here..."
        });
    }
});

Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return MyFiles.find();
});
