const express = require('express');
const sampleRoute = require('./routes/sampleRoute');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use('/sample', sampleRoute);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
