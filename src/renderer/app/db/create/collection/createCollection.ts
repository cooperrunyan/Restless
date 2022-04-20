import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function createCollection(workspaceId: string, data: Prisma.CollectionCreateInput) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const response = await prisma.collection.create({ data: { ...data, owner: { connect: { id: workspaceId } } } });

  prisma.$disconnect();
  return response;
}
