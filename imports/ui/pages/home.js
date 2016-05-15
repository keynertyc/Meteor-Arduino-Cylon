import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Robot1 } from '/imports/api/robot1/robot1.js';

import '/imports/ui/pages/home.html';

Template.body.onCreated(() => {
    Meteor.subscribe('Robot1.public');
});

Template.home.helpers({
    'leds' () {
        return Robot1.find();
    }
});

Template.home.events({
    'change .led' (event, template) {
        const state = template.$('#'+this.name).is(":checked");
        if (state) {
            Meteor.call('turnOnLed', this.name, this._id);
        } else {
            Meteor.call('turnOffLed', this.name, this._id);
        }
    },
    'click .on-all-led' () {
        Meteor.call('turnOnAll');
    },
    'click .toogle-all-led' () {
        Meteor.call('turnToogleAll');
    },
    'click .off-all-led' () {
        Meteor.call('turnOffAll');
    }
});
