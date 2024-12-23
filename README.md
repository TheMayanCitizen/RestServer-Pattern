# WebServer + RestServer

Creacion de una plantilla de un RestServer usando clases, separando rutas, controladores y haciendo peticiones _get, put, delete, post_.

Ademas usamos los params y queries que vienen desde la url.
http://localhost:8080/api/user/10?q=hola&name=alex&age=31

- Queries: q, hola, name, age
- Params: 10, definido en el router como /:id

# IMPORTANTE

- No te olvides de agregar tu script de "start" : "node app.js" en el package.json
- Crear tu archivo example.env sin el valor de las variables de entorno

## Instalaciones hechas.

- cors: npm i cors
- dotenv
- express
- moongose: npm install mongoose --save
- bcrypt: npm i bcryptjs
- express validator: npm i express-validator
- jsonwebtoken:npm i jsonwebtoken

## Documentacion usada

- https://mongoosejs.com/docs/guide.html
- https://www.npmjs.com/package/bcryptjs
- https://www.npmjs.com/package/express-validator

## Crear un release tag

`git tag -a v1.0.0 -m "Fin de seccion 8"`
`git push --tags` : para subir los tags a github

En github buscamos los tags, hacemos click en el tag que queremos, agregamos una descripcion y publicamos el relesea tag

## Remover un archivo trackeado en git

git rm .env --cached
git add. git commit -m "env borrado"

## Tarea - Desplegar en Railway

Pasos para hacer el despliegue de su aplicación a Railway.

1. Cambios en su repositorio

- git checkout -b 3.0.0
- git add .
- git commit -m "Fin sección 10 - version 3.0.0"

2. Crear y subir una rama

- git push (Ese comando dará un error)
- Usar el comando en la descripción del error para subir la rama.

3. En Railway, seleccionar la rama 3.0.0 para desplegar

4. Revisar si hay cambios en variables de entorno necesarias

5. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.
