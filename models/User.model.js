const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const UserSchema = new Schema({
 // _id: String,
  username: {
    type: String,
    unique: true
  },

  email: {
    type: String, 
    required: true,
    unique: true
  },

   password: {
    type: String, 
    required: true,
    // minlength: 6,
    // maxlength: 12
   }, 
  
   fullName:{
     type: String,
    //  required: true, 
     maxlength: 20
   },

   address: {
     type: String, 
     required: true, 
     maxlength: 30,
   },

   birthday: {
     type: Date,
    //  required: true,
   } 
   
});

const User = model("User", UserSchema);

module.exports = User;

