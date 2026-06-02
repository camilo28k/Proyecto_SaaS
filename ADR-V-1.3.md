# ADR-001: Adopción de Arquitectura Cliente-Servidor Desacoplada

**Estado**
Aceptado

## Contexto
El proyecto SaaS Manager requiere una interfaz web moderna y una API capaz de gestionar usuarios, servicios y operaciones. Se necesitaba una arquitectura que permitiera separar claramente las responsabilidades entre la capa visual y la lógica de negocio.

## Decisión
Se decidió implementar una arquitectura cliente-servidor desacoplada utilizando:

* **Frontend:** Next.js + React + TypeScript
* **Backend:** NestJS + TypeScript
* **Comunicación:** API REST sobre HTTP

La aplicación frontend consume los endpoints expuestos por el backend mediante peticiones HTTP.

## Consecuencias

### Ventajas
* Separación clara de responsabilidades.
* Mayor mantenibilidad.
* Escalabilidad independiente de frontend y backend.
* Posibilidad de incorporar aplicaciones móviles en el futuro utilizando la misma API.

### Desventajas
* Mayor complejidad inicial.
* Necesidad de gestionar CORS y autenticación entre aplicaciones.

## Alternativas consideradas
### Aplicación monolítica
Se consideró implementar frontend y backend en una sola aplicación, pero fue descartado debido a la menor flexibilidad y escalabilidad.

## Fecha
01/06/2026

# ADR-002: Uso de JWT para Autenticación y Control de Acceso

**Estado**
Aceptado

## Contexto
El sistema requiere controlar el acceso a funcionalidades según el rol del usuario:

* ADMIN
* OPERATOR
* CLIENT

Se necesitaba una solución de autenticación segura y compatible con arquitecturas desacopladas.

## Decisión
Se decidió utilizar JSON Web Tokens (JWT) junto con Passport y Guards de NestJS. El token almacena:

* `id`
* `email`
* `role`

Los tokens son enviados desde el frontend en cada solicitud protegida mediante el encabezado `Authorization`.

## Consecuencias

### Ventajas
* Arquitectura stateless.
* Fácil integración con aplicaciones web y móviles.
* Buen rendimiento al evitar sesiones almacenadas en servidor.
* Control granular de permisos mediante `RolesGuard`.

### Desventajas
* Los permisos no pueden modificarse hasta renovar el token.
* Es necesario implementar expiración y renovación de credenciales.

## Alternativas consideradas
### Sesiones tradicionales
Se descartó debido a la necesidad de almacenar sesiones en servidor y su menor compatibilidad con APIs REST modernas.

## Fecha
01/06/2026

# ADR-003: Uso de PostgreSQL y Prisma ORM para Persistencia de Datos

**Estado**
Aceptado

## Contexto
La aplicación maneja entidades relacionadas:

* User
* Service
* Operation

Estas entidades requieren integridad referencial y transacciones consistentes.

## Decisión
Se decidió utilizar:

* **Base de datos:** PostgreSQL (relacional).
* **ORM:** Prisma como capa de acceso a datos.

### Modelo principal
* User
* Service
* Operation

### Relaciones
* Un usuario puede tener múltiples operaciones.
* Un servicio puede estar asociado a múltiples operaciones.

## Consecuencias

### Ventajas
* Integridad referencial mediante claves foráneas.
* Migraciones controladas.
* Tipado fuerte con TypeScript.
* Consultas más seguras y mantenibles.

### Desventajas
* Curva de aprendizaje inicial de Prisma.
* Dependencia de migraciones para cambios estructurales.

## Alternativas consideradas
### MongoDB
Fue descartado porque el modelo del proyecto es altamente relacional y requiere integridad entre usuarios, servicios y operaciones.

## Fecha
01/06/2026

# ADR-004: Implementación de Control de Acceso Basado en Roles (RBAC)

## Estado

Aceptado

## Contexto

El sistema **SaaS Manager** maneja diferentes tipos de usuarios con permisos específicos:

- `ADMIN`
- `OPERATOR`
- `CLIENT`

Cada rol debe acceder únicamente a las funcionalidades autorizadas para evitar accesos indebidos y garantizar la seguridad del sistema.

## Decisión

Se decidió implementar un mecanismo de autorización basado en roles (RBAC) utilizando **Guards** y **Decorators** de NestJS.

La implementación se compone de:

- `roles.decorator.ts`
- `roles.guard.ts`
- `jwt-auth.guard.ts`

Los endpoints protegidos definen los roles permitidos mediante decoradores.

### Ejemplo

```typescript
@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
```

De esta manera, el sistema valida tanto la autenticación del usuario como los permisos asociados a su rol.

## Consecuencias

### Ventajas

- Mayor seguridad en el acceso a funcionalidades.
- Separación clara entre autenticación y autorización.
- Fácil mantenimiento de permisos.
- Escalable para agregar nuevos roles en el futuro.

### Desventajas

- Incrementa la complejidad de configuración.
- Requiere definir correctamente los permisos de cada endpoint.

## Alternativas Consideradas

### Validar roles manualmente en cada controlador

Se consideró verificar los roles dentro de cada método del controlador.

Esta alternativa fue **descartada** porque genera duplicación de código y dificulta el mantenimiento de reglas de autorización.

## Fecha

01/06/2026

# ADR-005: Centralización del Acceso a Datos mediante PrismaService

## Estado

Aceptado

## Contexto

El sistema utiliza Prisma ORM para acceder a PostgreSQL desde múltiples módulos:

- **Auth**
- **Users**
- **Services**
- **Operations**

Era necesario evitar la creación de múltiples instancias de conexión a la base de datos y centralizar la administración del acceso a datos.

## Decisión

Se decidió implementar un servicio centralizado denominado `PrismaService`, encargado de administrar la conexión a PostgreSQL para toda la aplicación.

La implementación extiende `PrismaClient` y utiliza el ciclo de vida de NestJS para inicializar la conexión.

```typescript
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

Posteriormente, el servicio se exporta desde `PrismaModule` y es inyectado en los diferentes servicios de la aplicación.

## Consecuencias

### Ventajas

- Un único punto de acceso a la base de datos.
- Reutilización de conexiones.
- Menor consumo de recursos.
- Mejor organización del código.
- Facilita la inyección de dependencias.

### Desventajas

- Dependencia directa de Prisma ORM.
- Los cambios en la estrategia de persistencia afectan al servicio central.

## Alternativas Consideradas

### Crear una instancia de PrismaClient en cada servicio

Se consideró crear conexiones independientes en cada módulo.

Esta alternativa fue **descartada** porque aumenta el consumo de recursos y dificulta la administración centralizada de la conexión.

## Fecha

01/06/2026


