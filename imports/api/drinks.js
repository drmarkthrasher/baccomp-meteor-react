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

    'drinks.insert'(type, description, volume, alcohol, day, month,year,
        hour,minute) {

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //this is here to show how to validate fields if needed.
        new SimpleSchema({
            type: {
              type: String,
              min: 1
            }
          }).validate({ type })

        Drinks.insert({ userId: Meteor.userId(), visible: true, type, description,
            volume, alcohol, day, month, year, hour,minute});
    }


})