const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl :{
        type:String,
        required:true
    },
    shortUrl :{
        type:String,
        required:true
    }
});
const url = mongoose.model("urlSchema",urlSchema);
module.exports=url;