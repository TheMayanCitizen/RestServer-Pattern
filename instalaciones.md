# WebServer + RestServer

Creacion de una plantilla de un RestServer usando clases, separando rutas, controladores y haciendo peticiones _get, put, delete, post_.

Ademas usamos los params y queries que vienen desde la url.
http://localhost:8080/api/user/10?q=hola&name=alex&age=31

- Queries: q, hola, name, age
- Params: 10, definido en el router como /:id

## Instalaciones hechas.

- cors: npm i cors
- dotenv
- express

No te olvides de agregar tu script de "start" : "node app.js" en el package.json

## Crear un release tag

`git tag -a v1.0.0 -m "Fin de seccion 8"`
`git push --tags` : para subir los tags a github

En github buscamos los tags, hacemos click en el tag que queremos, agregamos una descripcion y publicamos el relesea tag
