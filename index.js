const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database');

app.use(express.json());

app.get('/organizations', (req, res) => {
    db.findOrganizations(req.query)
        .then((results) => {
            res.json(results.rows);
        })
        .catch((e) => {
            res.status(500).send('Error');
        });
});

app.post('/organizations', (req, res) => {
    if (!req.body) res.status(500).send('Error');

    db.addOrganization(req.body)
        .then((results) => {
            res.status(200).json({results: results.rows});
        })
        .catch((e) => {
            res.status(500).send('Error');
    });
});

app.listen(port, () => { console.log(`listening on port: ${port}`); });

module.exports = {
    app
};