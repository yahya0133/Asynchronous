const mongoose = require('mongoose');
require('dotenv').config();

class connect__db {
    constructor() {
        this.url = process.env.MONGODB_URI;
    }

    async connect() {
        try {
            await mongoose.connect(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connect ...');
        } catch (error) {
            console.error(' Err connect', error.message);
            throw error;
        }
    }

}

module.exports = new connect__db();