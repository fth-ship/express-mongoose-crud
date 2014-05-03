# CRUD for express using mongoose

## Description

If you need a module, to extend express to perform CRUD operations using mongoose
this module, do that in this way...

## Installation

First of all you need to install the module using `npm`:

  [sudo] npm i [--save] express-mongoose-crud

## Usage

In you application you need to call:

  ```
  var crud = require('express-mongoose-crud');
  ```

And pass the `mongoose` reference to the function after your definitions,
or compilation of you models, just depends on you was defined it.

  ```
  crud = crud({ mongoose: mongoose });
  ```

After that, you be able to perform this:

### Create

  ```
  router.post('/:entity', crud, function (req, res) {
    res.json(res.locals[req.params.entity]);
  });
  ```
The `:entity` is required, because i use to find your model.
Now to read that is easy...

### Read

  ```
  router.get('/:entity/:id', crud, function (req, res) {
    res.json(res.locals[req.params.entity]); 
  });
  ```
If you have noted, with `req.params.entity` you be able to retrieve the content of `res.locals`,
with the name of your entity. In that way you can re-use in views if configure your application to do that.

### List

And if you need a list a bunch of data related to an entity that is the path to do this operation:

  ```
  router.get('/:entity', crud, function (req, res) {
    res.json(res.locals[req.params.entity]);
  });
  ```
Now you have an array in locals realted to entity.

### Update

And of course to update data:

  ```
  router.put('/:entity/:id', crud, function (req, res) {
    res.json(req.locals[req.params.entity]);
  });
  ```

### Remove

Finally the remove operation:

  ```
  router.delete('/:entity/:id', crud, function (req, res) {
    res.json(req.locals[req.params.entity]);
  });
  ```

### Notes

  All operations is surrounded by the http method, but you can do with some changes the with
  special param `action`, for example:

  ```
  routes.post('/:entity/:action', crud, function () {
    res.json(locals[req.params.entity]);
  });
  ```

  When you pull the trigger for example to `/product/create` with some content who match with
  schema the results appear, with agreements of you code block inside the route function.

## Created by

  Kaique da Silva <kaique.developer@gmail.com> under ISC license.

## Development mode

*Some changes are coming to this module, use with caution!*

To contribute with this module is easy, just put things inside your enviroment of development.

  git clone git://github.com/[your-user]/express-mongoose-crud.git

  or

  git clone https://github.com/fth-ship/express-mongoose-crud.git

Install the development dependencies:
  
  [sudo] npm i

Run the tests using `npm test`, before check if you has installed globally
the `mocha`, if you not... just do that:

  [sudo] npm i -g mocha

The tree structure was listed below:

  * lib - constains the lib files who deals with the logic of operations
  * index.js - contains the crud definitions and middleware setup
  * test - has the test of the lib and an test of the middleware with a case
  * README.md - A brief explanation about this module, if something new appears the first place who you fina some resource is here
  * package.json - Default

Sorry about any type error and issues are welcome, see you soon xox!
