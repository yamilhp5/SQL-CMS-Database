const { Pool } = require('pg');
const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: "postgres",
        // TODO: Enter PostgreSQL password
        password: "Santurce.21",
        host: "localhost",
        database: "employees",
        port: 5432
    },
    console.log(`Connected to the employees_db database.`)
);

module.exports = pool;

// (async () => {
//     client = await pool.connect()
//     try {
//     } finally {
//         client.release()
//     }
// })().catch(e => console.error(e.message, e.stack))