const express = require('express');

const app = express();

const resHandler = (req, res, next) => {
    res.respond = (status = 200, data = {}, message) => {
        let response = {
            success: status < 400,
            data
        }
        if (message) response.message = message;

        res.status(status).json(response);
    }
    next();
}

app.use(resHandler);

app.get('/', (req, res) => {
    console.log(res.respond(200, {}, "yes sir"));
});

app.listen(4000, () => {
    console.log(`server listening in port 4000`);
})