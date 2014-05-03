var express = require('express');
var mongoose = require('mongoose');
var app = express();
var crud = require('../');
var bodyParser = require('body-parser');
var routes = express.Router();

var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: { type: String }
});

mongoose.model('Product', productSchema);
mongoose.connect('localhost', 'express_mongoose_crud');
crud = crud({ mongoose: mongoose }); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

routes.post('/:entity', crud, function (req, res) {
  res.json(res.locals[req.params.entity]);
});

routes.get('/:entity/:id', crud, function (req, res) {
  res.json(res.locals[req.params.entity]);
});

routes.get('/:entity', crud, function (req, res) {
  res.json(res.locals[req.params.entity]);
});

routes.put('/:entity/:id', crud, function (req, res) {
  res.json(res.locals[req.params.entity]);
});

routes.delete('/:entity/:id', crud, function (req, res) {
  res.json(res.locals[req.params.entity]);
});

app.use(routes);

module.exports = exports = app;
