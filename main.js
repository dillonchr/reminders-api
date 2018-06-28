const http = require('http');

http
    .createServer((req, res) => {
        let status = 401;
        let result = {error: true, unauthorized: true};

        if (req.headers['x-api-token'] === process.env.BAD_PRACTICE) {
            status = 200;
            result = {yay: true};
        }

        res.writeHead(status, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    })
    .listen(process.env.PORT || 5515);
