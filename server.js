const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
  })
);

// Save the user ID in session
app.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = 555;

  req.session.user_id = id;
  res.json({route: "post", id, email, password});
});

// Save the user ID in session
app.get('/:id', (req, res) => {
  const id = req.params.id;
  req.session.user_id = id;
  res.json({route: "set", id});
});

// Get the user ID from the session
app.get('/', (req, res) => {
  console.log('req session :');
  console.log(req.session);

  const id = req.session.user_id;
  res.json({route: "get", id});
});

app.listen(8089);