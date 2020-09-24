# organizations-api

## About This Project
- This project uses Node.js, PostgreSQL, and Express to create an API that allows for querying and creating data for a database table called `organizations`.
- Heroku is used to host this project at https://organizations-app.herokuapp.com/organizations

## Usage
- Production Base URL: https://organizations-app.herokuapp.com/organizations
- To do a GET query, add the following query params to the base URL above. Or hit base URL directly to retrieve all organizations.
    - `name`:
        - Represents organziation name
        - Example: `name=San%20Francisco%20Corp`
        - Type: encoded URI string
    - `public`:
        - Represents public or private organziation
        - Example: `public=true`
        - Type: boolean
    - `employees`:
        - Represents number of employees in organziation
        - Example: `employees=123`
        - Type: integer
    - `started`:
        - Represents organziation founding date and time
        - Example: `started=1970-01-01T00:00:00.000Z`
        - Type: ISO datetime
- To add an entry to the database, you must send a POST request with a JSON body to the base URL above following the [schema below](#database-schema)

## Local Setup
1. Add a local instance of PostgreSQL (https://www.postgresql.org/) to your machine.
    - Create a database in your instance.
    - Add a local `.env` file to your clone of this repo with your PostgreSQL connection string as `DATABASE_URL` following this format. Substitute `username`, `password`, `localhost` if different, and `databaseName`. The default port is usually 5432 for PostgreSQL.
    ```
    DATABASE_URL=postgres://username:password@localhost:5432/databaseName
    ```
2. Add a table to your database called `organizations` with seed data following the [schema below](#database-schema)
3. VSCode Extension "REST Client" by Huachao Mao to use `.rest` files for testing local server and remote productions server from VSCode, otherwise see Step 5.
4. `npm install`
5. `npm start`, then you can test via your browser, curl commands or other REST client, or the VSCode extension described above. See [usage](#usage) for detail on GET and POST requests.

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
    - More testing on routes, and using mocked database.
    - Additional safety around types to prevent SQL injection attacks.
    - Switch `public` schema to another term to avoid using a reserved keyword
    - Additional CRUD operations to manage database
    - Structure additional routes in separate files using Express router