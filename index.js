'use strict'

// var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3999;

        app.listen(port, () => {
          console.log('El servidor http://localhost:3999 está funcionando !!!');
        });