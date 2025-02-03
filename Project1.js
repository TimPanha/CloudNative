const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let users = []; // In-memory storage for users

// 1. Registration Service (POST)
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// 2. Login Service (POST)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
});

// 3. Search Service (GET)
app.get('/search', (req, res) => {
    const { username } = req.query;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
});

// 4. Profile Update Service (PUT)
app.put('/profile/:id', (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    res.status(200).json({ message: 'Profile updated successfully', user });
});

// 5. Delete User Service (DELETE)
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});