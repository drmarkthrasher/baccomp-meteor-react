import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Drinks = new Mongo.Collection('drinks');

if(Meteor.isServer) {
    Meteor.publish('drinks', function () {
        return Drinks.find({ userId: this.userId });
    })

}

Meteor.methods({

    'drinks.insert'() {

       console.log('This method has been successfully called!');
    }


})