## Requisitos

Asegúrate de tener instalados los siguientes elementos en tu sistema:
- [Docker](https://www.docker.com/)

---

## Instrucciones para levantar el entorno

Sigue estos pasos para construir y ejecutar los contenedores:

1. Construir las imágenes y levantar los servicios definidos en segundo plano:
   ```bash
   docker compose up --build -d
   ```
2. Eliminar los servicios:
   ```bash
   docker compose down
   ```

---

## Estructura

### API 1 (Inicio)
- **Puerto:** `3000`
- **Descripción:**  
  API 1 (Inicio)
  Recibirá una solicitud, con un único dato identificado con la llave “user”, luego internamente realizará una solicitud a la API 2 (Registro) enviando el mismo “user”

### API 2 (Registro)
- **Puerto:** `3001`
- **Descripción:**  
  Esta API estará conectada con el tercer contenedor, es decir la base de datos, y recibirá el dato “user y lo insertará en la tabla, esta tabla se puede componer de una sola columna preferentemente, luego de insertar hará un conteo y retornará la cantidad de repeticiones de “user” guardadas. Este conteo regresará como respuesta al API 1.
  Finalmente, API 1 retornará al cliente que realizó la solicitud el número obtenido desde API 2.

### MongoDB (Base de datos)
- **Puerto:** `27017`

---

## 🔄 Llamadas a la API

### Opción 1:
Se puede hacer una consulta POST de un json con [Postman](https://www.postman.com/) a `http://localhost:3000`. Formato del json:
```json
{
  "user": "Carlos"
}

```

### Opción 2
También se puede hacer una consulta desde consola:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"user": "John"}' http://localhost:3000/
```

#### Respuesta:
```json
{
  "count": 1
}
```