const mongoose = require('mongoose');
const BlacklistSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: 'userModel',
        },
    }
);

const blackListModel = mongoose.model('blacklist', BlacklistSchema);
module.exports  = blackListModel;