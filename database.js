require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

function addOrganization(params) {
    // TODO: utilize params
    // TODO: cleanup/sanitze insertion of values
    const text = 'INSERT INTO organizations(name, public, employees, started) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = ["San Francisco Corp10", false, 20, "1995-11-27"];

    return pool
        .connect()
        .then(() => pool.query(text, values));
}

function findOrganizations(params) {
    // TODO: utilize params via conditions in query
    return pool
        .connect()
        .then(() => pool.query('SELECT * FROM organizations'));
        // NOTE: temp scaffold
        // TODO: specify query per params from GET request
}

module.exports = {
    addOrganization,
    findOrganizations
}
