import '../imports/teacherPanel.html'
import {MyFiles} from '../imports/collections/myFiles.js';

Template.allFiles.helpers({
    currentFiles() {
        return MyFiles.find({}, { sort: { createdAt: -1 } });
    },
});

