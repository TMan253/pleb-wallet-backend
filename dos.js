// This file does a DoS to test rate limiter.

const http = require("http");

function sendRequest() {
    const options = {
        host: 'localhost',
        port: 5500,
        path: '/',
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        console.log(`Response status code:  ${res.statusCode}`);
    });

    req.on("error", (e) => {
        console.error(`Request error:  ${e.message}`);
    });

    req.end();
}

// Invoke the API every 100 ms.
setInterval(sendRequest, 100);

