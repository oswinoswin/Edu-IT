import {Modules} from '../imports/collections/modules.js';
import '../imports/module-content.html';
import { Template } from 'meteor/templating';
import '../client/air.css';
import { Session } from 'meteor/session'


Template.moduleContent.helpers({
    number() {
        let current = Session.get("currentModule");
        console.log("current " + current);
        return Modules.findOne({number: current})['number'];
    },
    moduleText() {
        let current = Session.get("currentModule");
        let toDisp = Modules.findOne({number: current})['text'];
        console.log("Should be displayed: " + toDisp);
        return toDisp;
    },
});
