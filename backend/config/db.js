// ===== DATABASE CONFIGURATION =====
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzahub', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // In production, you might want to exit the process
        // process.exit(1);
        
        // For development, continue without database
        console.log('⚠️  Running in demo mode without database');
    }
};

// Connection event handlers
mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB error: ${err}`);
});

module.exports = connectDB;
