import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Cocktails = new Mongo.Collection('cocktails');

if(Meteor.isServer) {
    Meteor.publish('cocktails', function () {
        return Cocktails.find({  });
    })

}

