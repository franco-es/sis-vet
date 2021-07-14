# SIS_VET

_Bienvenidos a nuestro sistema de gestion de veterinarias._

## Comenzando 🚀

_Este proyecto es una idea para ayudar a la comunidad de veterinarios de diferentes provincias que puedan llevar a cabo sus consultas y demas tareas de una forma mas organizada y agil. el proyecto aun esta en face de desarrollo, faltan modulos por integrar, como el envio de mails, la subida de archivos como pdf y imagenes. ademas de realizar las historias clinicas y demas. de a poco se iran construyendo y se ira actualiando el proyecto dia a dia._


### Pre-requisitos 📋

_Para intalar los requerimientos de la API hay que ejecutar el siguiente codigo_

```
npm i
```

_La base de datos esta en alojada en mongo atlas, para ingrsar deberan modificar el index.js_

```
'use strict'

var mongoose = require("mongoose");
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://root:root2020@sysvetcluster.1tmfn.mongodb.net/SisVet?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("la coneccion a mongo se realizo");
    app.listen(port, () => {
      console.log("El servidor http://localhost:3999 está funcionando !!!");
    });
  })
  .catch((e) => console.log(e));
```

### Instalación 🔧

_Si hacen el login_

_Deberan pasarle los siguientes parametros_

```
email: admin1215@gmailo.com
password: 12345
getToken: true
```

_La respuesta enviada sera:_

```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZmFiNGY3OWNjNTdiNDIzOTAyZGYzNjAiLCJub21icmUiOiJmcmFuY28iLCJlbWFpbCI6ImFkbWluMTIxNUBnbWFpbG8uY29tIiwicm9sZSI6InZldGVyaW5hcmlhIiwiaWF0IjoxNjA4NjEwODY5fQ.E88Xbxwhf8AslK2F74OiUXERK8Mep00Zob6eaKz5JQw"
}
```

_el login es lo primero que debemos hacer ya que sino todos las demas consultas nos saldran error, debiendo estar autenticados para poder seguir con la consulta. en caso de necesitar mas explicacion no dude en contactarnos._


## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Node js](https://nodejs.org/es/) - El framework web usado para el BackEnd
* [Angular](https://maven.apache.org/) - El framework web usado para el FrontEnd
* [MongoDB](https://www.mongodb.com/) - Nuestro gestor de base de datos

## Contribuyendo 🖇️

_En el proyecto hemos estado 3 personas._
_Juan Ignacio Valderrama_
_Javier Silva_
_Franco Estrella_


## Expresiones de Gratitud 🎁

* Franco por las horas de enseñanza 📢
* John por la paciencia y estar siempre para toda duda posible 📢
* Invita una cerveza 🍺 o un café ☕ en cuanto se de la oportunidad. 
* MUCHAS GRACIAS 🤓.




---
⌨️ con ❤️ por [Franco](https://github.com/franco-es) 😊