// configurações
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express();
const port = 8000;

//DB
const db = require('./db/connection');

//template engine
app.engine('handlebars', exphbs.engine({ extname: 'handlebars', defaultLayout: "main"}));
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

//importar rotas
const notesRoutes = require('./routes/notes');

//rotas
app.get('/', async function(req,res){

    const notes = await db.getDb().db().collection('notes').find({}).toArray();

    res.render('home', {notes} );
})

app.use('/notes',notesRoutes);

db.initDb((err, db) => {
    if(err) {
      console.log(err);
    } else {
      app.listen(port, () => {
        console.log(`Projeto rodando na porta:${port}`)
      })
    }
  });
  