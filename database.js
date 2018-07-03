const fs = require('fs');

module.exports = {
    getRemindersForUser(userId, callback) {
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
    },
    addReminderForUser(userId, reminder, callback) {
        if (!reminder.when || !reminder.what) {
            callback(1);
        } else {
            callback(null, 1);
        }
    }
}