const http = require('http');
const db = require('./database.js');

http
    .createServer((req, res) => {
        let status = 401;
        let result = {error: true, unauthorized: true};

        if (req.headers['x-api-token'] === process.env.BAD_PRACTICE) {
            db.getRemindersForUser(req.url.split('/').pop(), (err, reminders) => {
                if (err) {
                    status = 500;
                    result = {error: true, message: err.message};
                } else {
                    status = 200;
                    result = {data: reminders};
                }
                res.writeHead(status, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(result));
            });
        } else {
            res.writeHead(status, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        }
    })
    .listen(process.env.PORT || 5515);
