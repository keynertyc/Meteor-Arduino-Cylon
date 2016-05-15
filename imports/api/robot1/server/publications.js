import { Meteor } from 'meteor/meteor';

import { Robot1 } from '/imports/api/robot1/robot1.js';

Meteor.publish('Robot1.public', () => {
    return Robot1.find();
});
