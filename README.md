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
