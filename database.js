require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

function getWhereClause(params) {
    const {
        name,
        employees,
        started,
        public
    } = params;

    let whereClause = '';

    if (name || employees || started || public === 'true' || public === 'false') {
        whereClause += 'WHERE ';

        let conditions = [];

        if (name) conditions.push(`name = '${name}'`);
        if (employees) conditions.push(`employees = ${employees}`);
        if (started) conditions.push(`started = '${started}'`);
        if (public === 'true' || public === 'false') conditions.push(`public = ${public}`);

        whereClause += conditions.join(' AND ');
    }

    return whereClause;
}

function addOrganization(params) {
    const {
        name = '',
        employees = 0,
        started = '1970-01-01T00:00:00.000Z',
        public = false
    } = params;

    const text = 'INSERT INTO organizations(name, public, employees, started) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, public, employees, started];

    return pool
        .connect()
        .then(() => pool.query(text, values));
}

function findOrganizations(params) {
    let text = 'SELECT * FROM organizations ';
    let whereClause = getWhereClause(params);

    text += whereClause;

    return pool
        .connect()
        .then(() => pool.query(text));
}

module.exports = {
    addOrganization,
    findOrganizations
};
