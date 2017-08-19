import '../imports/pageContent.html'
import '../imports/views/navbar.html'
import '../imports/fileUpload.html'
import '../client/main.html'

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
    }
});