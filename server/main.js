import { Meteor } from 'meteor/meteor';

import {Documents} from '../imports/collections/documents.js';
import {MyFiles} from '../imports/collections/myFiles.js';
import {Modules} from '../imports/collections/modules.js';
import {Roles} from '../imports/collections/roles.js';
import {YourFileCollection} from '../imports/collections/yourFileCollection.js';
import {EditorFiles} from '../imports/collections/editor-files';

Meteor.startup(function() {
    if (Documents.find().count() === 0) {
        return Documents.insert({
            name: "Sample doc",
            text: "Write here..."
        });
    }
});

Meteor.publish("fileUploads", function () {
    //console.log("publishing fileUploads");
    return YourFileCollection.find();
});


Meteor.publish("editorFiles", function () {
    console.log("publishing editorFiles");
    return EditorFiles.find();
});

Meteor.publish("editorFiles", function () {
    console.log("publishing editorFiles");
    return EditorFiles.find();
});
