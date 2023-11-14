const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    cPassword:{
        type:String,
        require:true
    }
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;