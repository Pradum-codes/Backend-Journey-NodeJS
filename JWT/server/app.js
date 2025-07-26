const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/db.config');
const PORT = process.env.PORT || 3001;

const userRoutes = require('./routes/user.route.js');
const contactRoutes = require('./routes/contact.route.js');

app.use(cors());
app.use(express.json());

connectDb().then(() => {
    app.get('/', (req, res) => {
        res.send('Server is UP!');
    });

    app.use('/api/user', userRoutes);
    app.use('/api/contact', contactRoutes);

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
