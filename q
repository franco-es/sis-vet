*   [33mc705e3f[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m)[m Merge branch 'main' of https://github.com/franco-es/sis-vet
[31m|[m[32m\[m  
[31m|[m * [33m38b0b98[m[33m ([m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m Delete node_modules directory
[31m|[m * [33mce6d955[m Update packaje.json for deploy
* [32m|[m [33m6393537[m se modifican rutas de cirugias
[32m|[m[32m/[m  
* [33mecba7fc[m se modifican detalles en las respuestas.
* [33mf9c5669[m se agregan middlewares para el checkeo de email, desde el upload y desde el registro.
* [33m5d09e52[m se instala express-fileupload para añadir documentos al backend
* [33m7644be2[m se optimiza vacunas y cirugias.
* [33m666af15[m se optimiza controlador de mascotas, agregando consultas. proximo a agregar vacunas y cirugias
* [33m4af8207[m se comenzo la optimizacion de los controladores, armando 7 rutas nuevas, usando destructuring y operadores ternarios.
* [33m9c4ac3d[m se comienza a optimizar las querys de mongoose, se trataban como querys de sql y no es asi.
*   [33m9ac2ebd[m se elimina el front fusionado con la api
[33m|[m[34m\[m  
[33m|[m * [33mca94090[m se modifica la creacion de usuarios en la API
[33m|[m * [33m6767f4e[m se deja visto la uri de la base de datos
[33m|[m * [33mcaf65bb[m se agrega nodemon
[33m|[m * [33m5ec2579[m se separan los archivos del front y del backend para subirlos a heroku
* [34m|[m [33m2f48659[m commit
[34m|[m[34m/[m  
* [33m68df7ca[m se empieza con el front end de la aplicacion, con quasar framework. logrado el login y almacenamiento en el localstorage
* [33m38fddb9[m termina el CRUD, previo al servicio de envio de emails. luego integracion de mercadopago o todopago
* [33m1eaff6b[m modificado el readme
* [33m593da22[m se modifica el readme
* [33m8783deb[m modificado el readme
* [33m0ee8ce5[m modificado el readme
* [33mde0ca6e[m se crea el archivo README.md y se modifica para dejar funcional el login.
* [33m93da4ef[m se crean el modulo de save para consultas, cirugias y vacunas. falta update y delete. modificando el resto de los modulos ya creados para que anden con el nuevo destructuring. proximo a crear es el modulo de envio de email
* [33m4632e7e[m se logra popular las obj, tambien me di cuenta que guarda el ObjectId unicamente en la relacion, pero con el populate los trae.
* [33m9c6e913[m se logra guardar una consulta.
* [33m6e3073c[m se logra hacer andar la eliminacion de las mascotas., se prosigue con la creacion de consultas
* [33mc4f4448[m se creo el modulo de mascota, se actualiza, falla en el eliminado... borra el usuario
* [33mb7226a1[m se continua con los modulos de owners, actualizar y ver unico owner. ademas de listar todos los owners por id de usuario.
* [33m083f6c1[m se empieza con el front en angular, se sigue con el alta de duenios
* [33mb4ba464[m cuarto commit, se crean los schemas de duenios, mascotas consultas vacunas y cirugias, falta el CRUD
* [33maa2ce77[m cuarto commit, se crean los empleados. se valida si son veterinaria(empresa) o veterinarios(individuales)
* [33m13338da[m se crea el registro y login de usuarios, cambia los schemas para mejor optimizacion
* [33m60c1a9a[m se cambia la db de mysql a mongodb
* [33m89ac3c1[m primer commit
