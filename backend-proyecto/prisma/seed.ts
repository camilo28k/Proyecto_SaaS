import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash(
    'Admin123*',
    10,
  );

  const operatorPassword =
    await bcrypt.hash(
      'Operator123*',
      10,
    );

  const clientPassword =
    await bcrypt.hash(
      'Client123*',
      10,
    );

  await prisma.user.upsert({
    where: {
      email: 'admin@saas.com',
    },
    update: {},
    create: {
      email: 'admin@saas.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: {
      email: 'operator@saas.com',
    },
    update: {},
    create: {
      email: 'operator@saas.com',
      password: operatorPassword,
      role: Role.OPERATOR,
    },
  });

  await prisma.user.upsert({
    where: {
      email: 'client@saas.com',
    },
    update: {},
    create: {
      email: 'client@saas.com',
      password: clientPassword,
      role: Role.CLIENT,
    },
  });

  console.log(
    'Usuarios iniciales creados correctamente',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });