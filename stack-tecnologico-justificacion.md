# Stack Tecnológico y Justificación Arquitectónica

## SaaS Manager – Gestión de Usuarios, Servicios y Operaciones

| Campo | Valor |
|-------|-------|
| Proyecto | SaaS Manager |
| Versión | v1.0 — Junio 2026 |
| Arquitectura | Cliente-servidor desacoplada (REST API + SPA) |

---

## 1. Backend

| Tecnología | Versión | Rol |
|------------|---------|-----|
| NestJS | `^10.x` | Framework principal de la API REST |
| TypeScript | `^5.x` | Tipado estático del backend |
| Prisma ORM | `^6.x` | Mapeo objeto-relacional y migraciones |
| PostgreSQL | 15 (Docker) | Base de datos relacional principal |
| JWT | `^11.x` | Autenticación basada en tokens |
| Passport | `^0.7.x` | Estrategias de autenticación |
| bcrypt | `^6.x` | Encriptación de contraseñas |
| Express | Integrado | Plataforma HTTP utilizada por NestJS |
| class-validator | `^0.14.x` | Validación de DTOs |

---

## 2. Frontend

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Next.js | `^15.x` | Framework React para la interfaz |
| React | `^19.x` | Construcción de componentes UI |
| TypeScript | `^5.x` | Tipado estático del frontend |
| Axios | `^1.x` | Consumo de la API REST |
| CSS Modules | Nativo | Estilos encapsulados |

---

## 3. Infraestructura

| Componente | Decisión |
|------------|----------|
| Docker | Contenerización de PostgreSQL |
| Docker Compose | Orquestación de servicios |
| Git | Control de versiones |
| GitHub | Repositorio del proyecto |
| PostgreSQL | Persistencia de datos |

---

## 4. Justificación por Tecnología

### 4.1 NestJS como framework backend

NestJS fue seleccionado porque proporciona una arquitectura modular basada en controladores, servicios y módulos. Esta organización facilita la mantenibilidad y escalabilidad del proyecto.

En SaaS Manager cada dominio del sistema se encuentra separado en módulos independientes:

- `AuthModule`
- `UsersModule`
- `ServicesModule`
- `OperationsModule`
- `PrismaModule`

Esta estructura permite mantener una clara separación de responsabilidades y facilita la reutilización de componentes.

### 4.2 TypeScript en toda la aplicación

El uso de TypeScript tanto en frontend como en backend permite detectar errores durante el desarrollo, mejorar el mantenimiento del código y proporcionar tipado estático.

Además, Prisma genera tipos automáticamente a partir del esquema de base de datos, garantizando consistencia entre las capas de la aplicación.

### 4.3 Prisma ORM + PostgreSQL

Prisma fue utilizado como ORM para simplificar el acceso a datos y administrar migraciones de base de datos.

PostgreSQL fue seleccionado porque el sistema maneja entidades altamente relacionadas:

- `User`
- `Service`
- `Operation`

Las relaciones entre usuarios, servicios y operaciones requieren integridad referencial y consistencia transaccional.

> **Decisión ADR-003**
>
> Se decidió utilizar PostgreSQL junto con Prisma ORM para garantizar:
>
> - Integridad referencial.
> - Migraciones controladas.
> - Consultas tipadas.
> - Facilidad de mantenimiento.

### 4.4 JWT para autenticación y autorización

El sistema implementa autenticación mediante JSON Web Tokens (JWT).

Los tokens contienen:

- `id`
- `email`
- `role`

Cada solicitud protegida debe incluir el token en el encabezado `Authorization`.

La validación se realiza mediante:

- `JwtStrategy`
- `JwtAuthGuard`

Esta decisión permite mantener una arquitectura stateless y desacoplada.

### 4.5 Control de acceso basado en roles (RBAC)

SaaS Manager implementa autorización basada en roles mediante:

- `RolesGuard`
- `RolesDecorator`

Los roles definidos son:

- `ADMIN`
- `OPERATOR`
- `CLIENT`

Esto permite restringir funcionalidades según el perfil del usuario.

**Ejemplos:**

- `ADMIN` puede gestionar usuarios y servicios.
- `OPERATOR` puede registrar operaciones.
- `CLIENT` solo puede consultar sus operaciones.

### 4.6 PrismaService como punto central de acceso a datos

Para evitar múltiples conexiones a la base de datos se implementó un servicio centralizado denominado `PrismaService`.

Este servicio:

- Inicializa la conexión automáticamente.
- Comparte la misma instancia entre módulos.
- Gestiona el cierre correcto de conexiones.

Los módulos:

- **Auth**
- **Users**
- **Services**
- **Operations**

utilizan `PrismaService` mediante inyección de dependencias.

Esta decisión mejora el rendimiento y la organización del proyecto.

### 4.7 Next.js y Axios en el frontend

Next.js fue utilizado para construir la interfaz web debido a su integración con React y soporte para TypeScript.

La comunicación con el backend se realiza mediante Axios.

Los servicios del frontend encapsulan la comunicación con la API:

- `auth.service.ts`
- `users.service.ts`
- `services.service.ts`
- `operations.service.ts`

Esto permite separar la lógica de negocio de los componentes visuales.

### 4.8 Docker para la base de datos

PostgreSQL se ejecuta dentro de un contenedor Docker administrado mediante Docker Compose.

Esto permite:

- Entornos reproducibles.
- Fácil despliegue.
- Independencia del sistema operativo anfitrión.

---

## 5. Decisión Arquitectónica Central

**Patrón:** Arquitectura Cliente-Servidor Desacoplada.

```
┌───────────────────┐
│     Next.js       │
│     Frontend      │
└─────────┬─────────┘
          │ HTTP / REST
          ▼
┌───────────────────┐
│      NestJS       │
│       API         │
└─────────┬─────────┘
          │ Prisma ORM
          ▼
┌───────────────────┐
│    PostgreSQL     │
│   Base de Datos   │
└───────────────────┘
```

El frontend nunca accede directamente a la base de datos. Todas las operaciones pasan por la API REST, que se encarga de la autenticación, autorización, validación y acceso a los datos.

---

## 6. Módulos NestJS definidos en AppModule

| Módulo | Función |
|--------|---------|
| `AuthModule` | JWT, Passport, RolesGuard |
| `UsersModule` | Gestión de usuarios |
| `ServicesModule` | Gestión de servicios |
| `OperationsModule` | Registro y consulta de operaciones |
| `PrismaModule` | Conexión centralizada a PostgreSQL |
