MONGO_URI=

request body on http://localhost:3000/users
{
  "name": "Pradum",
  "email": "pradum@example.com"
}

response:
{
    "name": "Pradum",
    "email": "pradum@example.com",
    "_id": "685c2872927a496eea999bcd",
    "__v": 0
}

response on http://localhost:3000/
[
  {
    "_id": "685c2872927a496eea999bcd",
    "name": "Pradum",
    "email": "pradum@example.com",
    "__v": 0
  }
]