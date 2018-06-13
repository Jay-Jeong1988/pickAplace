const express = require('express');
const app = express();
const logger = require('morgan');
// app.set('view engine','ejs');

app.get('/hello-world', (req, res)=>{
    res.send({express: 'heyddd'});
    // res.render('index');
} )

// app.get('/test', (req, res) =>{
//     res.redirect(301, '/hello-world');
// })

// app.use((req, res, next) => {
//     console.log(`📝 ${req.method} – ${req.path} – ${new Date().toString()}`);
//     next();
// });

app.use(logger(':method :url :status :date[clf]'));
app.use(express.static("public"));

const DOMAIN = 'localhost';
const PORT = 5000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});
