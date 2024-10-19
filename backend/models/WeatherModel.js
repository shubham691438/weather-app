const mongoose=require('mongoose')

const weatherSchema=new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    feelsLike:{
        type:Number,
        required:true
    },
    mainCondition:{
        type:String,
        required:true
    },
    timeOfData:{
        type:Date,
        required:true
    },
    humidity:{
        type:Number,
        required:true
    },
    windSpeed:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Weather',weatherSchema)