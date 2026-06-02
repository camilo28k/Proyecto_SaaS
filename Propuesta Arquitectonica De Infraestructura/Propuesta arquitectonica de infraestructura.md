# Propuesta Arquitectónica de Infraestructura

---

## Arquitectura de alto nivel

La solución consiste en una aplicación web desarrollada bajo una arquitectura cliente-servidor desacoplada. El frontend se encuentra implementado con Next.js, mientras que el backend utiliza NestJS como framework para exponer una API REST. La persistencia de datos se realiza mediante PostgreSQL, accediendo a ella a través de Prisma ORM.

Toda la solución se ejecuta en un entorno local de desarrollo utilizando `localhost`, donde los distintos componentes se comunican mediante HTTP y conexiones directas a la base de datos. Esta arquitectura permite separar claramente la interfaz de usuario, la lógica de negocio y la persistencia de datos.

---

## Descripción general del sistema

La solución propuesta consiste en una aplicación SaaS para la gestión de usuarios, servicios y operaciones.

El sistema está compuesto por tres capas principales:

- **Frontend (Next.js)**
- **Backend (NestJS)**
- **Base de Datos (PostgreSQL)**

La comunicación entre el frontend y el backend se realiza mediante peticiones HTTP utilizando Axios, mientras que el backend utiliza Prisma ORM para interactuar con PostgreSQL.

Esta arquitectura permite mantener una clara separación de responsabilidades y facilita el mantenimiento y evolución del sistema.

---

## Flujo de datos y componentes

### Usuario

Los usuarios acceden al sistema mediante un navegador web.

La aplicación está disponible en:

```
http://localhost:3001/
```

Desde esta interfaz pueden autenticarse y acceder a las funcionalidades disponibles según su rol.

### Frontend (Next.js)

El frontend está desarrollado con Next.js y React.

**Escucha en:**

```
http://localhost:3001
```

**Sus principales responsabilidades son:**

- Mostrar la interfaz gráfica.
- Gestionar formularios.
- Consumir la API REST.
- Mostrar información de usuarios, servicios y operaciones.
- Gestionar la autenticación del usuario.

### Backend (NestJS)

El backend está desarrollado con NestJS y expone una API REST.

**Escucha en:**

```
http://localhost:3000
```

**La aplicación implementa:**

- Controladores REST.
- Validación de DTOs.
- Autenticación JWT.
- Control de acceso basado en roles.
- Lógica de negocio.

**La configuración principal incluye:**

```typescript
app.enableCors();

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

### Prisma ORM

Prisma ORM actúa como capa de acceso a datos.

**Se encarga de:**

- Ejecutar consultas SQL.
- Gestionar migraciones.
- Mantener tipado fuerte con TypeScript.
- Administrar las relaciones entre entidades.

La conexión se centraliza mediante `PrismaService`.

### PostgreSQL

PostgreSQL almacena toda la información del sistema:

- Usuarios.
- Servicios.
- Operaciones.
- Roles.

**La base de datos se ejecuta localmente mediante Docker Compose.**

**Puerto:**

```
5432
```

---

## Persistencia de datos

### PostgreSQL

La base de datos relacional almacena las entidades principales:

#### User

| Campo | Tipo |
|-------|------|
| `id` | Identificador único |
| `email` | Correo electrónico |
| `password` | Contraseña encriptada |
| `role` | Rol del usuario |
| `createdAt` | Fecha de creación |

#### Service

| Campo | Tipo |
|-------|------|
| `id` | Identificador único |
| `name` | Nombre del servicio |
| `description` | Descripción |
| `price` | Precio |
| `isActive` | Estado activo |
| `createdAt` | Fecha de creación |

#### Operation

| Campo | Tipo |
|-------|------|
| `id` | Identificador único |
| `userId` | Referencia al usuario |
| `serviceId` | Referencia al servicio |
| `finalPrice` | Precio final |
| `createdAt` | Fecha de creación |

---

## Seguridad

### Autenticación

La autenticación se realiza mediante JWT.

Los tokens almacenan:

- `id`
- `email`
- `role`

El backend valida cada solicitud protegida mediante:

- `JwtStrategy`
- `JwtAuthGuard`

### Autorización

El sistema implementa autorización basada en roles mediante:

- `RolesGuard`
- `RolesDecorator`

**Roles disponibles:**

- `ADMIN`
- `OPERATOR`
- `CLIENT`

Cada rol tiene acceso únicamente a las funcionalidades autorizadas.

---

## Comunicación entre componentes

```
Usuario
    │
    ▼
Frontend (Next.js)
http://localhost:3001
    │
    │ HTTP / REST
    ▼
Backend (NestJS)
http://localhost:3000
    │
    │ Prisma ORM
    ▼
PostgreSQL
localhost:5432
```

---

## Escalabilidad y mantenimiento

La arquitectura actual está diseñada para un entorno académico y de desarrollo.

Sin embargo, permite futuras mejoras como:

- Despliegue en servidores cloud.
- Uso de Docker para todos los servicios.
- Implementación de HTTPS.
- Balanceadores de carga.
- Separación física entre frontend y backend.
- Migración de PostgreSQL a servicios administrados.

---

## Monitoreo y mantenimiento

Se recomienda supervisar:

- Estado del backend.
- Estado del frontend.
- Conexión a PostgreSQL.
- Consumo de recursos del servidor.
- Logs de NestJS.
- Logs de Docker.

Además, se deben realizar respaldos periódicos de la base de datos y mantener actualizadas las dependencias del proyecto.

---

## Resumen y conclusiones

- La arquitectura propuesta sigue un modelo **cliente-servidor desacoplado**.
- **Next.js** proporciona la interfaz de usuario.
- **NestJS** implementa la lógica de negocio y la API REST.
- **PostgreSQL** almacena la información persistente.
- **Prisma ORM** centraliza el acceso a los datos.
- **JWT** y **RolesGuard** garantizan la seguridad y el control de acceso.
- La solución es adecuada para un entorno académico y permite evolucionar hacia arquitecturas más robustas en el futuro.
