const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.url;
const port = process.env.port;
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url).then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log(`error in connecting database ${e}`);
});
const urls =require('./model/urlSchema');


app.get('/',(req,res)=>{
    return res.render('home');
});
app.post('/shorten',async(req,res)=>{
    const {url} = req.body;
    const counter = Math.floor(Math.random()*100);
    const shortUrl =`xyz${counter}`
    const shortData = new urls({
        longUrl:url,
        shortUrl
    });
    try {
    const existingUrl = await urls.findOne({shortUrl});
    if(existingUrl){
        const counter = Math.floor(Math.random()*100);
    const shortUrl =`xyz${counter}`
         const shortData = new urls({
        longUrl:url,
        shortUrl
    });
    await shortData.save();
    
    return res.status(200).json({status:200,message:shortUrl});
    }
    await shortData.save();
    return res.status(200).json({status:200,message:shortUrl});
    // console.log('data saved ');
    // return res.render('home');
    } catch (error) {
        console.log(error);
        return res.status(404).json({status:404,message:"error in shortening data"});

    }

});
app.get('/:url',async(req,res)=>{
    const shortUrl = req.params.url;
    const validUrl = await urls.findOne({
        shortUrl
    });
    if(!validUrl){
        return res.status(404).json({message:"Invalid URL"});
    }
    return res.redirect(validUrl.longUrl);
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})