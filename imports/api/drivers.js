import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Drivers = new Mongo.Collection('drivers');

if(Meteor.isServer) {
    Meteor.publish('drivers', function () {
        return Drivers.find({ userId: this.userId });
    })

    // setInterval(function () {
    //     var date = new Date();
    //     console.log("Function is running");
    // }, 1000)
}

Meteor.methods({
    'drivers.insert'(name, height, weight, raceTeam, raceTeamWebsite,
        suit, shoes, gloves, helmet, hans, personalNotes) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //this is here to show how to validate fields if needed.
        new SimpleSchema({
            name: {
              type: String,
              min: 1
            }
          }).validate({ name })

        Drivers.insert({ userId: Meteor.userId(), visible: true, name, height, weight, raceTeam, raceTeamWebsite,
            suit, shoes, gloves, helmet, hans, personalNotes});
    },
    'drivers.setVisibility'(_id, visible) {
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
        
        Drivers.update({
           _id, 
           userId: this.userId 
        }, {
            $set: {
                visible: visible
            }
        })

    },
    'drivers.delete'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Drivers.remove({ _id, userId: this.userId })
    },
    'drivers.retreive'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        const drivers = Drivers.find({ _id, userId: this.userId }).fetch();
        return drivers[0];  //note:  there should be only one item
        
    }, 
    'drivers.save'(_id, name,height,weight,raceTeam,raceTeamWebsite,
        suit,shoes,gloves,helmet,hans,personalNotes) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Drivers.update({
            _id, 
            userId: this.userId 
         }, {
             $set: {
                //  visible: visible,
                 name: name,
                 height: height,
                 weight: weight,
                 raceTeam: raceTeam,
                 raceTeamWebsite: raceTeamWebsite,
                 suit: suit,
                 shoes: shoes,
                 gloves: gloves,
                 helmet: helmet,
                 hans: hans,
                 personalNotes: personalNotes
             }
         })


    }

        
})