import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function ensureUser() {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  if (users[0]) return;

  await prisma.user.create({
    data: {
      settings: {},
      workspaces: {
        create: {
          name: 'My Workspace',
        },
      },
    },
  });
  prisma.$disconnect();
}
