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
    enum: ['Select Category','Music', 'Sports', 'Garage Sales', 'Meet-Ups', 'Arts & Crafts', 'Gaming', 'Food', 'Fashion', 'Seminars', 'Themed Parties', 'Others']
  },

   description: {
    type: String, 
    required: true,
    maxlength: 300
   }, 
  
   location:{
     type: String,
     required: true, 
     enum: ['Select City', 'Berlin', 'Porto', 'Lisbon', 'Amsterdam', 'Paris', 'Madrid']
   },

   date: {
     type: Date, 
     required: true, 
   },

   eventPic: {
     type: String,
     default: "https://i.picsum.photos/id/741/536/354.jpg?hmac=JV13P4XHP5tamm2vlyXNFZxns3IyVLT_akGo-VhYPkw"
   },

   ageRestriction: Number
});

const Event = model("Event", EventSchema);

module.exports = Event;
