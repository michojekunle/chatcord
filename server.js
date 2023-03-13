const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {console.log(`Server Running on port ${PORT}`)})