const fs = require('fs');

module.exports = {
    getRemindersForUser(userId, callback) {
        console.log('reminders', userId);
        const remindersPath = `data/all.json`;
        fs.readFile(remindersPath, (err) => {
            if (err) {
                callback(null, []);
            } else {
                try {
                    callback(null, JSON.parse(data));
                } catch (err) {
                    callback(null, []);
                }
            }
        });
    }
}