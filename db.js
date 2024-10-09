const mongoose = require("mongoose")
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'


// Set up Mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error("MongoDB connection error:", error);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

module.exports = db;