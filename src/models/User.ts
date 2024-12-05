import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, unique: true, required: true},
    email: {type:String, unique:true, required: true},
    password: {type: String, required:true},
    role : {type: String, default: 'user'},
});

export const User = mongoose.model('User', UserSchema);