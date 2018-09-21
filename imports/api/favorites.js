import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Favorites = new Mongo.Collection('favorites');

if(Meteor.isServer) {
    Meteor.publish('favorites', function () {
        return Favorites.find({ userId: this.userId });
    })

}


Meteor.methods({

    

    'favorites.insert'(type, description, volume, alcohol) {

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

        Favorites.insert({ userId: Meteor.userId(), type, description,
            volume, alcohol});
    },
    'favorites.delete'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Favorites.remove({ _id, userId: this.userId })
    },
    'favorites.retreive'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        const favorites = Favorites.find({ _id, userId: this.userId }).fetch();
        return favorites[0];  //note:  there should be only one item
        
    }, 
    'favorites.save'(_id, type,description,volume,alcohol) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id })

        Favorites.update({
            _id, 
            userId: this.userId 
         }, {
             $set: {
                //  visible: visible,
                 type: type,
                 description: description,
                 volume: volume,
                 alcohol: alcohol
             }
         })
    }
    

})



