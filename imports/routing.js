import '../imports/pageContent.html'
import '../imports/views/navbar.html'
import '../imports/fileUpload.html'
import '../imports/teacherPanel.html'
import '../imports/collaborative.html'
import '../client/main.html'
import '../imports/module-content.html'
import '../imports/editor.html';
import '../imports/editor';
import '../client/main.css'
import { Session } from 'meteor/session'

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

Router.route('/collaborative', function(){
    this.layout('ApplicationLayout');
    this.render('collaborative', {to: 'pageContent'});
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



Router.route('/editor/:_number', function () {
        console.log(' EDITOR TEST: params._number = ' + this.params._number);
        Session.set("currentEditor" ,  this.params._number );
        this.render('editor', {
            to: 'pageContent',
        });
    },{
        name: 'editor.show'
    }
);




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
    },
    'click #collaborative': function (){
        Router.go('/collaborative');
    }
});