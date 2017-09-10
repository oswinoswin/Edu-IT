import '../imports/teacherPanel.html'
import {MyFiles} from '../imports/collections/myFiles.js';
import {YourFileCollection} from '../imports/collections/yourFileCollection.js';

Template.allFiles.helpers({
    currentFiles() {
        return MyFiles.find();
    },
});

Template.currentFile.events({
    'click #downloadButton'(event){

        event.preventDefault();
        //var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
        //var file = new File(this.file, "downoladed.pdf", {type: "pdf"});
        //var file = this.my_file;
        //saveAs( file, this.file_name, true);
        //console.log(this.my_file.toString());
        let myBlob = new Blob([this.my_file], {type: 'octet/stream'});
        console.log(myBlob instanceof Blob);
        saveAs(myBlob, this.file_name);

    }
});
