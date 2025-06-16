const authoRouter = require('express').Router();

authoRouter.get('/:authorId', (req, res) => {
    const { authorId } = req.params;
    res.send(`Author ID: ${authorId}`);
    console.log(req.params);
    res.end();
});

module.exports = authoRouter;
