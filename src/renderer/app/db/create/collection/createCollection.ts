import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';
import { modifyCurrentWorkspace } from '../../modify/workspace';

export async function createCollection(workspaceId: string, name: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const response = await prisma.collection.create({
    data: {
      name,
      owner: { connect: { id: workspaceId } },
    },
  });

  await modifyCurrentWorkspace({
    currentCollection: response.id,
  });

  // prisma.$disconnect();
  return response;
}
