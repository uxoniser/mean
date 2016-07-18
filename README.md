# mean
Proyecto de MEAN curso Knowtech
## Instalacion
### Base de datos
1. Ejecutar __cmd__ o __terminal__
2. `mongod` (hay que tener previamente creado el directorio /data/db).
3. Abrir otra __cmd__ o __terminal__
4. `mongo`
5. `use storedb`
6. En el directorio del proyecto ir a __app/config/init.json__ y copiar el `.json`
7. `db.product.insert(`__pegar el texto copiado__`)`
8. `db.product.show().pretty()` para verificar que los productos se insertaron correctamente.

### Aplicacion
1. Abrir otra __cmd__ o __terminal__ y navegar hasta el directorio raiz de la aplicacion (donde se encuentra el fichero `server.js`)
2. `npm install`
3. `node server`
4. Abrir el navegador e ir a `localhost:8080`
