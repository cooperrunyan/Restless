import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';
import { createFolder } from '../folder';

export async function createRequest(collectionId: string, data: Exclude<Prisma.RequestCreateInput, 'owner'>) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const allPaths = [...(await prisma.request.findMany()).map(request => request.path), ...(await prisma.path.findMany()).map(path => path.value)];

  for (const path of allPaths) {
    if (path === data.path) throw new Error('That name has been taken');
  }

  await createFolder(collectionId, { value: ('/' + data.path.split('/').slice(0, -1).join('/')).replaceAll('//', '/').replace('/', '') });

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

  return await response;
}
