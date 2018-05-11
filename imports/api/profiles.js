import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Profiles = new Mongo.Collection('profiles');

if(Meteor.isServer) {
    Meteor.publish('profiles', function () {
        return Profiles.find({ userId: this.userId });
    })

}

Meteor.methods({

    'profiles.insert'(fullname, gender, age, weight) {

        

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //this is here to show how to validate fields if needed.
        new SimpleSchema({
            fullname: {
              type: String,
              min: 1
            }
          }).validate({ fullname })

        Profiles.insert({ userId: Meteor.userId(), fullname,gender,age,weight});
    },
    'profiles.find'(){
        const profiles = Profiles.find({userId: this.userId }).fetch();
        // console.log("Profile is "+profiles[0].fullname);
        return profiles[0]; 
        
    }, 
    'profiles.save'(_id, fullname,gender,age,weight) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Profiles.update({
            _id, 
            userId: this.userId 
         }, {
             $set: {
                //  visible: visible,
                 fullname: fullname,
                 gender: gender,
                 age: age,
                 weight: weight
             }
         })
        }

})