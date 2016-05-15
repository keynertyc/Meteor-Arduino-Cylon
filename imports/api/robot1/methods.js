import { Meteor } from 'meteor/meteor';

import { Robot1 } from '/imports/api/robot1/robot1.js';

Meteor.methods({
    'turnOnLed' (led, id) {
        if (Meteor.isServer) {
            myRobot.commands.turnOnLed(led);
        }
        Robot1.update({
            _id: id,
        }, {
            $set: {
                status: 'checked'
            }
        });
    },
    'turnOffLed' (led, id) {
        if (Meteor.isServer){
            myRobot.commands.turnOffLed(led);
            Robot1.update({
                _id: id,
            }, {
                $set: {
                    status: ''
                }
            });
        }
    },
    'turnOnAll' () {
        if (Meteor.isServer){
            myRobot.commands['turnOnAll'].call();
        }
        Robot1.update({}, {
            $set: {
                status: 'checked'
            }
        }, {multi: true});
    },
    'turnToogleAll' () {
        if (Meteor.isServer){
            myRobot.commands['turnToogleAll'].call();
        }
        Robot1.update({}, {
            $set: {
                status: 'checked'
            }
        }, {multi: true});
    },
    'turnOffAll' () {
        if (Meteor.isServer){
            myRobot.commands['turnOffAll'].call();
        }
        Robot1.update({}, {
            $set: {
                status: ''
            }
        }, {multi: true});
    }
});
