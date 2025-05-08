const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
const dataPath = './data/users.json';

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Register page
app.get('/form', (req, res) => {
  res.render('index'); // views/index.hbs
});

// Create user → then auto-login
app.post('/add-user', (req, res) => {
  const { username, profilePic, password } = req.body;
  let users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.send("Username already taken!");
  }

  // Add user to JSON
  users.push({ username, profilePic, password });
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

  // 👇 Pass user directly to login.hbs so localStorage will be set
  res.render('login', { user: { username, profilePic } });
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Login logic
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.render('login', { error: 'Invalid username or password!' });
  }

  res.render('login', { user });
});

// Settings page
app.get('/settings/:username', (req, res) => {
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const user = users.find(u => u.username === req.params.username);

  if (!user) return res.status(404).send("User not found!");
  res.render('settings', { user });
});

// Update user info
app.post('/update-user', (req, res) => {
  const { originalUsername, newUsername, password, profilePic } = req.body;
  let users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const user = users.find(u => u.username === originalUsername);
  if (!user) return res.status(404).send("User not found!");

  user.username = newUsername;
  user.password = password;
  user.profilePic = profilePic;

  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  res.redirect(`/settings/${user.username}`);
});

// Delete user
app.post('/delete-user', (req, res) => {
  const { username } = req.body;
  let users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  users = users.filter(u => u.username !== username);
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  res.redirect('/');
});

// Homepage (optional if using home.hbs)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // or use res.render('home')
});

// Run the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.use(express.json());

app.post('/save-outfit', (req, res) => {
  const { username, outfit } = req.body;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const user = users.find(u => u.username === username);
  if (!user) return res.json({ success: false });

  if (!user.savedOutfits) user.savedOutfits = [];
  user.savedOutfits.push(outfit);

  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  res.json({ success: true, savedOutfits: user.savedOutfits });
});

app.post('/delete-outfit', (req, res) => {
  const { username, index } = req.body;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const user = users.find(u => u.username === username);

  if (!user || !user.savedOutfits) return res.status(400).send("Bad request");

  user.savedOutfits.splice(index, 1); // remove outfit at index
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  res.sendStatus(200);
});

app.get('/get-outfits', (req, res) => {
  const username = req.query.username;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).send("User not found");
  res.json(user.savedOutfits || []);
});

