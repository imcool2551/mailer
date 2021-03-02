const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const logger = require('morgan');
const app = express();
const path = require('path');
const db = require('./models/index').sequelize;

db.sync()
  .then(() => {
      console.log("DB connected")
  })
  .catch(err => {
      console.log("DB Connection Error")
      console.log(err)
  })

// Handle PUT, DELETE
app.use(methodOverride('_method'));

// Logger
app.use(logger('dev'));

// View Engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Static File Serving
app.use(express.static(path.join(__dirname, 'public')));

// Handle Http Body
app.use(express.json());
app.use(express.urlencoded({extended : false }));

// Session Setting
app.use(session({
    secret: '2351!$#^vrv3251',
    resave: false,
    saveUninitialized: true
}))

// Routing
app.get('/', (req, res) => {
    res.render('home');
})
app.use('/add', require('./routes/add'));
app.use('/send', require('./routes/send'));
app.use('/log', require('./routes/log'));
app.use('/edit', require('./routes/edit'));

// 404 Error
app.use((req, res, next) => {
    next('404 Not Found')
})

// Error Handling
app.use((err, req, res, next) => {
    res.render('error', { err });
})

// Open Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server open on port ${PORT}`);
})