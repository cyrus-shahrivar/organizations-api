const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// TODO: hook-up pg database:
const database = [
    {
        name: 'ABC123 Corp.',
        started: '2020-09-30T01:21:33.573Z',
        employees: 12,
        public: true
    },
    {
        name: 'ABC123 Corp.',
        started: '2020-09-24T01:21:33.573Z',
        employees: 20,
        public: true
    },
    {
        name: 'ABC123 Corp.',
        started: '2020-09-25T01:21:33.573Z',
        employees: 20,
        public: false
    },
    {
        name: 'XYZ123 Corp.',
        started: '2020-09-26T01:21:33.573Z',
        employees: 12,
        public: false
    },
    {
        name: 'XYZ123 Corp.',
        started: '2020-09-27T01:21:33.573Z',
        employees: 12,
        public: true
    }
];

app.use(express.json());

app.get('/organizations', (req, res) => {
    const {
        name,
        started,
        employees,
        public
    } = req.query;

    // TODO: connect to real database query and response
    const databaseResults = database.filter((entry) => true);

    res.json({results: databaseResults});
});

app.post('/organizations', (req, res) => {
    // TODO: update with real database success/failure handling
    database.push(req.body);
    res.status(200).json({results: database});
});

app.listen(port, () => { console.log(`listening on port: ${port}`); });