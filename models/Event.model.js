const { Schema, model } = require("mongoose");
require('./User.model');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const EventSchema = new Schema({
  // mongoose creates id by default

  attendants: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  title: {
    type: String,
    required: true
  },

  category: {
    type: String, 
    // required: true, 
    enum: ['Music', 'Sports', 'Garage Sales', 'Meet-Ups', 'Arts & Crafts', 'Gaming', 'Food', 'Fashion', 'Seminars', 'Themed Parties', 'Others']
  },

   description: {
    type: String, 
    required: true,
    maxlength: 300
   }, 
  
   location:{
     type: String,
     required: true, 
     enum: ['Berlin', 'Porto', 'Lisbon', 'Amsterdam', 'Paris', 'Madrid']
   },

   date: {
     type: Date, 
     required: true, 
   },

   photo: {
     type: String,
   } ,

   ageRestriction: Number
});

const Event = model("Event", EventSchema);

module.exports = Event;
