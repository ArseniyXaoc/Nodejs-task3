const express = require('express');
const app = express();
const db = require('./db');
const user = require('./resources/routers/user.router');
const game = require('./resources/routers/game.router');
const PORT = 4000;
const validateSession = require('./middleware/validate-session')

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

db.sync();

app.use(express.json());
app.use('/api/auth', user);
app.use(validateSession);
app.use('/api/game', game);
app.listen(PORT, function() {
    console.log(`App is running on http://localhost:${PORT}`)
})