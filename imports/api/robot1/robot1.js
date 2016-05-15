import { Meteor } from 'meteor/meteor';
import { Monto } from 'meteor/mongo';

import Cylon from 'cylon';

import '/imports/api/robot1/methods.js';

export const Robot1 = new Mongo.Collection('robot1');

let myRobot = {};
