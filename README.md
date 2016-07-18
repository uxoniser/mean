# mean
Proyecto de MEAN curso Knowtech
## Instalacion
### Base de datos
1. Ejecutar __cmd__ o __terminal__
2. `mongod` (hay que tener previamente creado el directorio /data/db).
3. Abrir otra __cmd__ o __terminal__
4. `mongo`
5. `use storedb`
6. En el directorio del proyecto ir a __app/config/init.json__ y copiar el texto
7. `db.product.insert(`_pegar el texto copiado_`)`
8. `db.product.show().pretty()` para verificar que los productos se insertaron correctamente.

### Aplicacion
1. Abrir otra __cmd__ o __terminal__ y navegar hasta el directorio raiz de la aplicacion (donde se encuentra el fichero `server.js`)
2. `npm install`
3. `node server`
4. Abrir el navegador e ir a `localhost:8080`

> Pueden hacer fork de la app, hacer mejoras y subirlas a sus repos, o hacer pull request de esta y hacer las modificaciones directamente sobre este repo
