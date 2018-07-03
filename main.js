const http = require('http');
const db = require('./database.js');

http
    .createServer((req, res) => {
        let status = 401;
        let result = {error: true, unauthorized: true};

        if (req.headers['x-api-token'] === process.env.BAD_PRACTICE) {
            const userId = req.url.split('/').pop();
            if (req.method === 'POST') {
                let stuff = '';
                req
                    .on('data', d => stuff += d)
                    .on('end', () => {
                        db.addReminderForUser(userId, JSON.parse(stuff), (err) => {
                            res.writeHead(err ? 500 : 200, {'Content-Type': 'application/json'});
                            res.end(`{"${err ? 'error' : 'data'}": ${err ? 'true' : '{"success":true}'}}`);
                        });
                    });
            } else {
                db.getRemindersForUser(userId, (err, reminders) => {
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
            }
        } else {
            res.writeHead(status, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        }
    })
    .listen(process.env.PORT || 5515);
