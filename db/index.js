const pg = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({
    connectionString: connectionString,
    // ssl: {
    //     rejectUnauthorized: false
    //   }
});

module.exports = pool;