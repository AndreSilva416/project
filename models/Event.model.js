const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const EventSchema = new Schema({
  // mongoose creates id by default

  // attendants: [{
  //   type: mongoose.ObjectId,
  //   ref: "User"
  // }],

  // creator: {
  //   type: mongoose.ObjectId,
  //   ref: "User"
  // },

  title: {
    type: String,
    required: true
  },

  category: {
    type: String, 
    // required: true, 
    enum: ['Music', 'Sports']
  },

   description: {
    type: String, 
    required: true,
    maxlength: 300
   }, 
  
   location:{
     type: String,
     required: true, 
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
