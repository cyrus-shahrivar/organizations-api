# organizations-api

## About This Project
- This project uses node.js, PostgreSQL, and express to create an API that allows for querying and creating data for a database table called `organizations`.
- Heroku is used to host this project at https://organizations-app.herokuapp.com/organizations

## Usage
- Production Base URL: https://organizations-app.herokuapp.com/organizations
- To query, add the following query params to the base URL above. Or hit base URL directly to retrieve all organizations.
    - `name`:
        - represents organziation name
        - example: `name=San%20Francisco%20Corp`
        - type: encoded URI string
    - `public`:
        - represents public or private organziation
        - example: `public=true`
        - type: boolean
    - `employees`:
        - represents number of employees in company
        - example: `employees=123`
        - type: integer
    - `started`:
        - represents organziation founding date and time
        - example: `started=1970-01-01T00:00:00.000Z`
        - type: ISO datetime
- To add an entry to the database, you must send a POST body to the base URL above following the [schema below](#database-schema)

## Local Setup
1. An local instance of PostgreSQL: https://www.postgresql.org/
    - A local `.env` file in created in this repo with your PostgreSQL connection string following this format. Substitute `username`, `password`, `localhost` if different, and `databaseName`. The default port is 5432 for PostgreSQL.
    ```
    DATABASE_URL=postgres://username:password@localhost:5432/databaseName
    ```
2. VSCode Extension "REST Client" by Huachao Mao to use `.rest` files for testing local server and remote productions server from VSCode
3. `npm install`
4. `npm start`, then you can test via your browser, curl commands or other REST client, or the VSCode extension described above.

## Database Schema
The database for this project uses a table generated called `organizations`. The schema for a database entry is below with SQL types:

```
{
    name: varchar(80), // limited character string
    public: boolean,
    employees: int, // integer
    started: date // ISO datetime
}
```

## Additional Comments and Thoughts
- Further enhacements
    - More testing
    - Structure additional routes in separate files using express router
    - CRUD operations if more detail
    - Additional safety around types to prevent SQL injection attacks.
    - Switch `public` schema to another term to avoid using a reserved keyword