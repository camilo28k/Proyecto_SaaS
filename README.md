# SaaS Manager

## Descripción

**SaaS Manager** es una aplicación web desarrollada para la gestión interna de usuarios, servicios y operaciones comerciales simuladas. La plataforma permite administrar clientes, registrar servicios y asociar dichos servicios a usuarios mediante operaciones, manteniendo un historial organizado de actividades.

---

# Tecnologías Utilizadas

## Frontend

- Next.js
- React
- TypeScript
- Axios

## Backend

- NestJS
- TypeScript
- Prisma ORM
- JWT Authentication

## Base de Datos

- PostgreSQL

## Contenedores

- Docker
- Docker Compose

---

# Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 20+
- npm
- Docker Desktop
- Git

### Verificar versiones

```bash
node -v
npm -v
docker -v
docker compose version
```

---

# Clonar el Proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd Proyecto-SaaS
```

---

# Configuración del Backend

Entrar a la carpeta:

```bash
cd backend-proyecto
```

Crear el archivo:

```env
.env
```

Contenido:

```env
DATABASE_URL="postgresql://SaaS:SaaS123@localhost:5432/portfolio1?schema=public"

POSTGRES_USER=SaaS
POSTGRES_PASSWORD=SaaS123
POSTGRES_DB=portfolio1

JWT_SECRET=sncjfbdsbfncjdsbjvbjhfbdvnckcjksmndjcn
JWT_EXPIRES_IN=7d
```

---

# Levantar PostgreSQL

Desde la carpeta backend:

```bash
docker compose up -d
```

Verificar contenedor:

```bash
docker ps
```

Debe aparecer:

```text
postgres_db
```

---

# Instalar Dependencias Backend

```bash
npm install
```

---

# Ejecutar Migraciones

Verificar estado:

```bash
npx prisma migrate status
```

Aplicar migraciones:

```bash
npx prisma migrate dev
```

Generar cliente Prisma:

```bash
npx prisma generate
```

---

# Ejecutar Backend

```bash
npm run start:dev
```

Backend disponible en:

```text
http://localhost:3000
```

---

# Configuración del Frontend

Entrar a la carpeta:

```bash
cd frontend-saas
```

Crear:

```env
.env.local
```

Contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

# Instalar Dependencias Frontend

```bash
npm install
```

---

# Ejecutar Frontend

```bash
npm run dev
```

Frontend disponible en:

```text
http://localhost:3001
```

---

# Estructura General del Sistema

## Roles

### ADMIN

#### Permisos

- Crear usuarios
- Editar usuarios
- Eliminar usuarios
- Crear servicios
- Editar servicios
- Eliminar servicios
- Crear operaciones
- Editar operaciones
- Eliminar operaciones

---

### OPERATOR

#### Permisos

- Consultar usuarios
- Crear clientes
- Editar clientes
- Consultar servicios
- Crear operaciones
- Editar operaciones

---

### CLIENT

#### Permisos

- Consultar servicios
- Consultar únicamente sus operaciones

---

# Flujo de Uso

## 1. Iniciar Sesión

Acceder a:

```text
http://localhost:3001/auth/login
```

---

## 2. Crear Servicios

Como administrador:

```text
Dashboard
→ Servicios
→ Nuevo servicio
```

Registrar:

- Nombre
- Descripción
- Precio

---

## 3. Crear Usuarios

Como administrador:

```text
Dashboard
→ Usuarios
→ Nuevo usuario
```

Registrar:

- Correo
- Contraseña
- Rol

Roles disponibles:

```text
ADMIN
OPERATOR
CLIENT
```

---

## 4. Crear Operaciones

Como administrador u operador:

```text
Dashboard
→ Operaciones
→ Nueva operación
```

Seleccionar:

- Cliente
- Servicio
- Valor final

---

## 5. Consultar Operaciones

### ADMIN

Visualiza todas las operaciones.

### OPERATOR

Visualiza todas las operaciones.

### CLIENT

Visualiza únicamente las operaciones asociadas a su cuenta.

---

# Base de Datos

## Tabla User

| Campo | Tipo |
|---------|---------|
| id | UUID |
| email | String |
| password | String |
| role | Enum |
| createdAt | DateTime |

---

## Tabla Service

| Campo | Tipo |
|---------|---------|
| id | UUID |
| name | String |
| description | String |
| price | Decimal |
| isActive | Boolean |
| createdAt | DateTime |

---

## Tabla Operation

| Campo | Tipo |
|---------|---------|
| id | UUID |
| userId | UUID |
| serviceId | UUID |
| finalPrice | Decimal |
| createdAt | DateTime |

---

# Comandos Útiles

## Prisma Studio

```bash
npx prisma studio
```

Abrirá:

```text
http://localhost:5555
```

---

## Ver Migraciones

```bash
npx prisma migrate status
```

---

## Generar Cliente Prisma

```bash
npx prisma generate
```

---

## Reiniciar Contenedores

```bash
docker compose down
docker compose up -d
```

---

# Solución de Problemas

## Error

```text
role "postgres" does not exist
```

### Solución

Ingresar con el usuario definido en docker-compose:

```bash
docker exec -it postgres_db sh
```

```bash
psql -U SaaS portfolio1
```

---

## Ver Tablas Creadas

Dentro de PostgreSQL:

```sql
\dt
```

---

## Ver Usuarios Registrados

```sql
SELECT * FROM "User";
```

---

## Ver Operaciones Registradas

```sql
SELECT * FROM "Operation";
```

---

# Autores

Proyecto desarrollado como plataforma SaaS para la gestión interna de usuarios, servicios y operaciones utilizando:

- Next.js
- NestJS
- PostgreSQL
- Prisma ORM

---

# Licencia

Este proyecto fue desarrollado con fines académicos y de aprendizaje.