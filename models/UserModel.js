const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator")

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    roleGroup : {
      type: String,
      default: 'Support Staff',
      // enum: Array, creates a validator that checks if the value is strictly equal to one of the values in the given
      enum: ["IT and Design", "Human Resource", "Project Management", "Business Development", "office Admin", "Support Staff"]       
    },
    roleName: {
      type: String,
    }
  } ,
   confirmStaff: {
     type: Boolean,
     default: false
   },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const UserProfileSchema = new Schema({
  profilePicture: {

  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
},
  level : {
    type: String,
    enum : ["Propation", "Junior", "Intermediate", "Senior"]
  },
  currentSalary : {
    types: Number,
  }
})

const UserProfile = mongoose.model("userprofile", UserProfileSchema)
const User = mongoose.model("user", UserSchema);
module.exports =  User
