import { Meteor } from 'meteor/meteor';

import {Documents} from '../imports/collections/documents.js';
import {MyFiles} from '../imports/collections/myFiles.js';
import {Modules} from '../imports/collections/modules.js';

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
