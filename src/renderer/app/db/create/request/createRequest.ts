import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';
import { createFolder } from '../folder';

export async function createRequest(collectionId: string, data: Exclude<Prisma.RequestCreateInput, 'owner'>) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const response = prisma.request.create({
    data: {
      ...data,
      owner: {
        connect: {
          id: collectionId,
        },
      },
    },
  });

  createFolder(collectionId, { value: data.path.split('/').slice(0, -1).join('/') });

  return await response;
}
