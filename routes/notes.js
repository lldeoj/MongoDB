const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

router.get('/:id', async function(req,res){
    const id = new ObjectId(req.params.id);

    const note = await db.getDb().db().collection('notes').findOne({_id : id});

    res.render('notes/detail', {note});
})

router.get('/', function(req, res){
    res.render('notes/create');
})

//envio para inserção dos dados no banco.
router.post('/', function(req,res){
    const data = req.body;
    const title = data.title;
    const description = data.description;

    db.getDb().db().collection('notes').insertOne({ title: title, description: description});

    res.redirect(301,'/');

})

//edição da nota
router.get('/edit/:id', async function(req,res){

    const id = new ObjectId(req.params.id);

    const note = await db.getDb().db().collection('notes').findOne({_id: id});

    res.render('notes/edit',{note});
})

router.post('/update', function(req,res){

    const data = req.body;
    const cid = new ObjectId(data.id);
    const ctitle = data.title;
    const cdescription = data.description;

    db.getDb().db().collection('notes').updateOne({ _id: cid },{$set: { title: ctitle, description: cdescription} });
    
    res.redirect(301,'/');
})


//remoção da tarefa
router.post('/delete', function(req,res){
    const data = req.body;
    const id = new ObjectId(data.id);

    db.getDb().db().collection('notes').deleteOne({_id: id});

    res.redirect(301,'/');
})

module.exports = router;