import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Documents} from './documents.js';



import './editor-page.html'





///documents
var DocumentsRouter, Router;

DocumentsRouter = Backbone.Router.extend({
    routes: {
        ":document_id": "main"
    },
    main: function(document_id) {
        return Session.set("document_id", document_id);
    },
    setDocument: function(document_id) {
        return this.navigate(document_id, true);
    }
});


Router = new DocumentsRouter;

Meteor.startup(function() {
    return Backbone.history.start({
        pushState: true
    });
});



Template.documentList.helpers({

    "documents": function() {
        return Documents.find({}, {
            sort: {
                name: 1
            }
        })
    }

});




Template.documentList.events = {
    'click #new-document': function(e) {
        var name;
        name = $('#new-document-name').val();
        if (name) {
            return Documents.insert({
                name: name,
                text: ""
            });
        }
    }
};

Template.document.events = {
    'click #delete-document': function(e) {
        return Documents.remove(this._id);
    },
    'click #edit-document': function(e) {
        return Router.setDocument(this._id);
    }
};

Template.document.helpers({
    "selected": function() {
        if (Session.equals("document_id", this._id)) {
            return "selected";
        } else {
            return "";
        }
    }
});

Template.documentView.helpers({
    "selectedDocument" : function() {
        var document_id, selected;
        document_id = Session.get("document_id");
        selected = Documents.findOne({
            _id: document_id
        });
        if (selected) {
            $('#document-text').val(selected.text);
            return selected;
        }
    }
});


Template.documentView.rendered = function() {
    var editor = CodeMirror.fromTextArea(document.getElementById("document-text"), {
        lineNumbers: true,
        mode: "python"
    });

    editor.on("change", function() {
        console.log(editor.getValue());
        console.log("keyup");
        var mod, sel;
        sel = {
            _id: Session.get("document_id")
        };
        mod = {
            $set: {
                text: editor.getValue()
            }
        };
        return Documents.update(sel, mod);
    });
};




