const mongoose = require("mongoose");
//const { default: Password } = require("../fontend/notes-app/src/components/Input/Password");

const Schema = mongoose.Schema;

const useSchema = new Schema({
    name:{type : String},
    email: {type : String},
    password: {type: String,
        required: [true, "Phone Is Required!"],
        minLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"],},
    phone:{type: String},
    createdOn: {type: Date,default: new Date().getTime()},
    access_token: {type: String, require: true},
    refresh_token:{type: String, require:true},
},
{
timeseries:true
});

module.exports = mongoose.model("User",useSchema);
