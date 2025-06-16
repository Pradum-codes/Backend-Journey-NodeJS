# Path

With string paths, we can also use {} to make characters optional. For example:

// Matches both /message and /messages
"/message{s}"

// Matches both / and /messages
"/{messages}"

// Matches both /foo/baz and /foo/bar/baz
"/foo{/bar}/baz"

A common use case for a splat would be as a catch-all for all otherwise unmatched paths, e.g. for custom 404 error handling.

## Route Parameters

To denote a route parameter, we start a segment with a : followed by the name of the parameter (which can only consist of case-sensitive alphanumeric characters, or _). Whatever we name that route parameter, Express will automatically populate the req.params object in any of the following middleware functions with whatever value the path passed into the parameter, using the parameter name as its key.

/**
 * GET /odin/messages will have this log
 * { username: "odin" }
 *
 * GET /theodinproject79687378/messages would instead log
 * { username: "theodinproject79687378" }
 */
app.get("/:username/messages", (req, res) => {
  console.log(req.params);
  res.end();
});

/**
 * GET /odin/messages/79687378 will have this log
 * { username: "odin", messageId: "79687378" }
 */
app.get("/:username/messages/:messageId", (req, res) => {
  console.log(req.params);
  res.end();
});


## Route Query

Query parameters are a unique and optional part of a URL that appear at the end. A ? denotes the start of the query parameters, with each query being a key-value pair with the format key=value, and each query separated by an &. They are special as they are not actually considered part of the path itself, but are essentially more like arguments we can pass in to a given path.
For example, /odin/messages?sort=date&direction=ascending will still match the route with the /:username/messages path, but we can access the sort=date and direction=ascending key-value pairs inside the middleware chain.
Express automatically parses any query parameters in a request and will populate the req.query object with any key-value pairs it finds. If any keys are repeated, Express will put all values for that key into an array.

/**
 * GET /odin/messages?sort=date&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: "date", direction: "ascending" }
 *
 * GET /odin/messages?sort=date&sort=likes&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: ["date", "likes"], direction: "ascending" }
 */
app.get("/:username/messages", (req, res) => {
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  res.end();
});

