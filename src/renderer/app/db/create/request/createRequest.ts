import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function createRequest(collectionId: string, data: Exclude<Prisma.RequestCreateInput, 'owner'>) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const response = await prisma.request.create({
    data: {
      ...data,
      owner: {
        connect: {
          id: collectionId,
        },
      },
    },
  });

  prisma.$disconnect();

  return response;
}
