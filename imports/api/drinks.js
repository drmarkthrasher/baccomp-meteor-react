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
        hour,minute,date) {

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
            volume, alcohol, day, month, year, hour,minute,date});
    },
    'drinks.setVisibility'(_id, visible) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
    
        new SimpleSchema({
            _id: {
                type: String, 
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate ({ _id, visible})
        
        Drinks.update({
           _id, 
           userId: this.userId 
        }, {
            $set: {
                visible: visible
            }
        })

    },
    'drinks.delete'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Drinks.remove({ _id, userId: this.userId })
    },
    'drinks.retreive'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        const drinks = Drinks.find({ _id, userId: this.userId }).fetch();
        return drinks[0];  //note:  there should be only one item
        
    }, 
    'drinks.save'(_id, type,description,volume,alcohol,day,
        month,year,hour,minute,date) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Drinks.update({
            _id, 
            userId: this.userId 
         }, {
             $set: {
                //  visible: visible,
                 type: type,
                 description: description,
                 volume: volume,
                 alcohol: alcohol,
                 day: day,
                 month: month,
                 year: year,
                 hour: hour,
                 minute: minute,
                 date: date
             }
         })
    },
    'drinks.find'(){
        const drinks = Drinks.find({userId: this.userId }).fetch();
        // console.log("Profile is "+profiles[0].fullname);
        return drinks; 
        
    }

})