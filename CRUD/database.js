const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'mydb',
});

// Export a function that returns a Promise
const getUsers = () => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM user', (err, results) => {
      if (err) {
        return reject(err);
      }

      const userList = results.map(user => ({
        id: user.userId,
        name: user.userName,
      }));

      resolve(userList);
    });
  });
};

module.exports = { getUsers };