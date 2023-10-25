const mongoose = require('mongoose');

const connectToDB = async()=>{
    await mongoose.connect('mongodb+srv://avi:12345@cluster0.eeitc2w.mongodb.net/courseapp?retryWrites=true&w=majority', {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(conn=>{
        console.log(`connected to db: ${conn.connection.name}`);
        
    }).catch(err=>{
        console.log(err.message)
    })
}

module.exports = connectToDB;