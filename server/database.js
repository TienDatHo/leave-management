const mariadb = require('mariadb');
const pool = new mariadb.createPool({
    user: 'dat',
    host: 'localhost',
    database: 'hello_world',
    password: '123456'
});

module.exports = pool;