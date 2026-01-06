const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Default XAMPP password
    database: 'sportsphere_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection FAILED:', err.message);
        return;
    }
    console.log('✅ Connected to XAMPP MySQL (sportsphere_db)');
});

// --- PUBLIC ROUTES ---

// Get Live Scores for Home and Admin Dashboard
app.get('/api/live-scores', (req, res) => {
    const sql = "SELECT * FROM live_scores";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get All Approved Teams
app.get('/api/teams', (req, res) => {
    const sql = "SELECT * FROM teams WHERE status = 'approved'";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get Single Team Details by ID
app.get('/api/teams/:id', (req, res) => {
    const sql = "SELECT * FROM teams WHERE id = ?";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Team not found" });
        res.json(results[0]);
    });
});

// --- ADMIN & AUTH ROUTES ---

// Admin Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admins WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length > 0) {
            res.json({ success: true, message: "Login Successful", user: results[0].username });
        } else {
            res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    });
});

// 1. UPDATE Match Score (For Save Button)
app.put('/api/admin/scores/:id', (req, res) => {
    const { score1, score2, summary } = req.body; //
    const sql = "UPDATE live_scores SET score1 = ?, score2 = ?, summary = ? WHERE id = ?";
    db.query(sql, [score1, score2, summary, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Changes Saved" }); //
    });
});

// 2. DELETE a Team
app.delete('/api/admin/teams/:id', (req, res) => {
    const sql = "DELETE FROM teams WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Team Deleted Successfully" }); //
    });
});

// 3. ADD a New Team
app.post('/api/admin/teams', (req, res) => {
    const { team_name, matches_played, points } = req.body;
    const sql = "INSERT INTO teams (team_name, matches_played, points, status) VALUES (?, ?, ?, 'approved')";
    db.query(sql, [team_name, matches_played, points], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "New Team Added" });
    });
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`🚀 SportSphere Backend running on http://localhost:${PORT}`);
    console.log('-------------------------------------------');
});
