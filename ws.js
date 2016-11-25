//dependencias
var express = require('express');
//instancia
var app = express();

//acesso ao mongodb
var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/checklists');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Conectado!");
});

//instancia o schema
var Tarefa = require("./Model/TarefaModel.js");


//rotas
//app.method('route', callback(req,res){})
app.get('/', function (req, res) {
	res.send(JSON.stringify("Acessando a Index do Projeto <br>" +
						"Rotas: <br>" +
						"/insert <br>" +
						"/update <br>" +
						"/delete <br>" +
						"/select <br>" +
						"/select-one/{id}"));
	console.log("Index.");
});

app.get('/insert', function (req, res) {
	console.log("Insert.");
	//set de dados na instancia
	var tarefa = new Tarefa({
		titulo: "Novo Insert com Mongoose",
		descricao: "Testando o maldito mongoose(parece até nome de doença)"
	});
	//efetua insert
	tarefa.save(function(err) {
		if (err){
		    res.json({"status": false, "message": err});
		}
		else{
			res.json({"status": true, "message": "Cadastro efetuado"});
		}
	});
});

app.get('/select', function (req, res) {
	console.log("Select.");
	Tarefa.find({}, function(err, docs) {
	    if (!err){
	        res.json({"status": true, "results": docs});
	    }
			else {
				res.json({"status": false, "message": err});
			}
	});

});

app.get('/select-one/:id', function (req, res) {
	console.log("Select.");
	Tarefa.find({_id: req.params.id}, function(err, docs) {
	    if (!err){
	        res.json({"status": true, "results": docs});
	    }
			else {
				res.json({"status": false, "message": err});
			}
	});

});


var server = app.listen(8000, function () {
   console.log("Example app listening at 8000");
});