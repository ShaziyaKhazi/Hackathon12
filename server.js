// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve your static HTML, CSS, JS files

// MongoDB connection (Change the URI to your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/courseSelectionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define a schema for student data
const studentSchema = new mongoose.Schema({
    regNumber: String,
    branch: String,
    year: String,
    subjects: [String],
    feedback: [String]
});

// Create a model from the schema
const Student = mongoose.model('Student', studentSchema);

// Endpoint to receive and store data
app.post('/submit-data', (req, res) => {
    const { regNumber, branch, year, subjects, feedback } = req.body;

    // Save the data to MongoDB
    const newStudent = new Student({
        regNumber,
        branch,
        year,
        subjects,
        feedback
    });

    newStudent.save()
        .then(() => res.json({ message: 'Data saved successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
