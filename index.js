const express = require('express');
const app = express();
const logger = require('morgan');
app.set('view engine','ejs');

app.get('/hello-world', (req, res)=>{
    res.render('index')
} )

app.use((req, res, next) => {
    console.log(`📝 ${req.method} – ${req.path} – ${new Date().toString()}`);
    next();
});

app.use(logger(':method :url :status :date[clf]'));


const DOMAIN = 'localhost';
const PORT = 3000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});
