# 🚗 Parkside

**Parkside** es una aplicación integral para la gestión de parqueaderos que incluye módulos para clientes, administración, backend de servicios y un motor de inteligencia artificial (IA).

## 🧩 Arquitectura del Proyecto

El sistema está compuesto por los siguientes servicios:

| Servicio         | Descripción                       | Puerto |
|------------------|-----------------------------------|--------|
| 🧑‍💻 Frontend Cliente | Interfaz para los usuarios finales       | 8081   |
| 🛠️ Frontend Admin   | Panel administrativo del sistema       | 8082   |
| 🧠 Backend          | API REST construida en FastAPI         | 8000   |
| 🤖 IA              | Módulo de inteligencia artificial       | 8001   |

---

## 🚀 Despliegue con Docker Compose

### 1. Pre-requisitos

- Tener instalado [Docker](https://www.docker.com/)
- Tener instalado [Docker Compose](https://docs.docker.com/compose/)

### 2. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/parkside.git
cd parkside
```

### 3. Ejecutar los servicios

```bash
docker-compose up --build
```

Esto construirá y levantará todos los contenedores necesarios. Cada servicio será accesible en su puerto correspondiente:

- Cliente: [http://localhost:8081](http://localhost:8081)
- Admin: [http://localhost:8082](http://localhost:8082)
- Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)
- IA: [http://localhost:8001/docs](http://localhost:8001/docs)

---

### 4. Ejecutar el script simulate_event.py desde el contenedor

Una vez que los contenedores estén levantados, puedes ejecutar el script simulate_event.py (que está en el directorio Utils) dentro del contenedor que corresponde al servicio de IA. Sigue estos pasos:

**1. Acceder al contenedor del servicio de IA**

Identifica el nombre del contenedor del servicio de IA (por ejemplo, my-fastapi-app) con el siguiente comando:
```sh
docker ps
```
Busca el contenedor correspondiente al servicio de IA. Una vez identificado, accede al contenedor con:
```
docker exec -it <nombre-del-contenedor> /bin/bash
```
Por ejemplo:
```
docker exec -it my-fastapi-app /bin/bash
```

**2. Ejecutar el script simulate_event.py**

Una vez dentro del contenedor, navega al directorio donde se encuentra el script:
```
cd /MLmodels/Utils 
```
Luego, ejecuta el script usando poetry:
```
poetry run python simulate_event.py
```
Esto ejecutará el script dentro del entorno del contenedor usando las dependencias definidas en pyproject.toml.

---

## 📌 Notas

- Asegúrate de que los puertos 8000–8001 y 8081–8082 estén libres antes de ejecutar el proyecto.
- Para detener los servicios:
  ```bash
  docker-compose down
  ```

---

## ✨ Autor

Desarrollado por 
- Mateo Fonseca
- Manuel Castro
- Andrés Hurtado
- Juan Valdés
- Thomas Ariza
