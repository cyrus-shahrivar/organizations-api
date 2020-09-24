require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

function getWhereClause(params) {
    const {
        name,
        employees,
        started
    } = params;

    const publicParam = params['public'];

    let whereClause = '';

    if (name || employees || started || publicParam === 'true' || publicParam === 'false') {
        whereClause += 'WHERE ';

        let conditions = [];

        if (name) conditions.push(`name = '${name}'`);
        if (employees) conditions.push(`employees = ${employees}`);
        if (started) conditions.push(`started = '${started}'`);
        if (publicParam === 'true' || publicParam === 'false') conditions.push(`public = ${publicParam}`);

        whereClause += conditions.join(' AND ');
    }

    return whereClause;
}

function addOrganization(params) {
    const {
        name = '',
        employees = 0,
        started = '1970-01-01T00:00:00.000Z'
    } = params;

    const publicParam = params['public'] || false;

    const text = 'INSERT INTO organizations(name, public, employees, started) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, publicParam, employees, started];

    return pool
        .connect()
        .then((client) => {
            return client.query(text, values)
                .then((results) => {
                    client.release();
                    return results;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                });
        });
}

function findOrganizations(params) {
    let text = 'SELECT * FROM organizations ';
    let whereClause = getWhereClause(params);

    text += whereClause;

    return pool
        .connect()
        .then((client) => {
            return client.query(text)
                .then((results) => {
                    client.release();
                    return results;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                });
        });
}

module.exports = {
    addOrganization,
    findOrganizations
};
