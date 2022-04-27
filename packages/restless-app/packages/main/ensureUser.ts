import { v4 as uuid } from 'uuid';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client') as typeof import('@prisma/client');
const prisma = new PrismaClient();

export async function ensureUser() {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  if (users[0]) return;

  const id = uuid();

  const user = await prisma.user.create({
    data: {
      settings: {},
      workspaces: {
        create: {
          name: 'My Workspace',
          currentCollection: id,
          collections: {
            create: {
              name: 'My First Collection',
              id,
            },
          },
        },
      },
    },
  });

  const workspace = await prisma.workspace.findFirst()!;

  await prisma.user.update({
    where: { id: user.id },
    data: { currentWorkspaceId: workspace?.id },
  });
}
