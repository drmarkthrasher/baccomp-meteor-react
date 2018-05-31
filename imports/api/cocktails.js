import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Cocktails = new Mongo.Collection('cocktails');

if(Meteor.isServer) {
    Meteor.publish('cocktails', function () {
        return Cocktails.find({  });
    })

}


Meteor.methods({

    'cocktails.parse'(name) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            name: {
                type: String,
                min: 1
            }
        }).validate({ name })

        var str=name.trim();

        const cocktails = Cocktails.find({ d_name: new RegExp(str, 'i') }).fetch();
        return cocktails;  
        
    },
    'cocktails.retreive'(name) {

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            name: {
                type: String,
                min: 1
            }
        }).validate({ name })

        const cocktails = Cocktails.find({ d_name: name }).fetch();
        return cocktails[0];  //note:  there should be only one item
        
    }

    

})

