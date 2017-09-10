import '../imports/pageContent.html'
import '../imports/views/navbar.html'
import '../imports/fileUpload.html'
import '../imports/teacherPanel.html'
import '../client/main.html'
import '../imports/module-content.html'
import {Modules} from '../imports/collections/modules.js'
import {Roles} from '../imports/collections/roles.js'

Router.route('/', function(){
    this.layout('ApplicationLayout');
    this.render('about');
});

Router.route('/about', function(){
    this.layout('ApplicationLayout');
    this.render('about', {to: 'pageContent'});
});

Router.route('/editorPage', function(){
    this.layout('ApplicationLayout');
    this.render('editorPage', {to: 'pageContent'});
});

Router.route('/fileUpload', function(){
    this.layout('ApplicationLayout');
    this.render('fileUpload', {to: 'pageContent'});
});

Router.route('/teacherPanel', function(){
    this.layout('ApplicationLayout');
    this.render('teacherPanel', {to: 'pageContent'});
});



Router.route('/modules/:_number', function () {
    console.log('TEST: params._number = ' + this.params._number);
    Session.set("currentModule" ,  this.params._number );
    this.render('moduleContent', {
        to: 'pageContent',
    });
},{
        name: 'module.show'
    }
);

Template.moduleContent.helpers({
    number() {
        var current = Session.get("currentModule");
        //console.log("current " + current);
        return Modules.findOne({number: current})['number'];
    },
    moduleText() {
        var current = Session.get("currentModule");
        //console.log(Modules.findOne({number: current})['text']);
        console.log("ROLE:" + Roles.findOne({"user": Meteor.userId()})['role']);
        return Modules.findOne({number: current})['text'];
    },
});

/*Router.route('/modules/:_id', function () {
console.log('TEST: params._id = ' + this.params._id);
this.render('Module', {
    data: function () {
        return Modules.findOne({_id: this.params._id});
    }
});
});*/



Template.navBar.events({
    'click #about': function (){
        Router.go('/about');
    },
    'click #logo': function (){
        Router.go('/');
    },
    'click #editorPage': function (){
        Router.go('/editorPage');
    },
    'click #fileUpload': function (){
        Router.go('/fileUpload');
    },
    'click #teacherPanel': function (){
        Router.go('/teacherPanel');
    }
});