require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MangoRoute = require('./routes/MangoRoute');
const admin = require('./firebase');

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('trust proxy', true);



app.use('/api', MangoRoute);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
