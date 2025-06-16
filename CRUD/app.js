const express = require('express');
const { getUsers } = require('./database'); // Note: import destructured

const app = express();

app.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users); // send as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000');
});
