// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file
// in the public directory. The comments.html file should have a form that allows
// users to submit comments. The submitted comments should be saved in a file named
// comments.txt in the public directory.

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'comments.html'));
});

app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  fs.appendFile(path.join(__dirname, 'public', 'comments.txt'), `${comment}\n`, (err) => {
    if (err) {
      res.status(500).send('Error saving comment');
    } else {
      res.status(200).send('Comment saved');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
