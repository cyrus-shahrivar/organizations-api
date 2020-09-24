const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database');

app.use(express.json());

app.get('/organizations', (req, res) => {
    db.findOrganizations(req.query)
        .then((results) => {
            console.table(results.rows);
            res.json(results.rows);
        })
        .catch((e) => { console.log('error', e); });
        // TODO: review database pool closure
        // TODO: update with success/failure handling
});

app.post('/organizations', (req, res) => {
    db.addOrganization(req.body)
        .then((results) => {
            console.table(results.rows);
            res.status(200).json({results: results.rows});
        })
        .catch((e) => { console.log('error', e); });
        // TODO: review database pool closure
        // TODO: update with success/failure handling
});

app.listen(port, () => { console.log(`listening on port: ${port}`); });