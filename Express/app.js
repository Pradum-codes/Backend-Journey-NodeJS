const express = require("express");
const path = require("path");
const app = express();
const authorRouter = require("./routes/authorRouter")

app.use(express.static(path.join(__dirname, 'public')));

app.get("/:username/messages", (req, res) => {
  console.log(req.params);
  res.end();
});

app.use('/authors', authorRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});