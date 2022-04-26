import { Prisma } from '@prisma/client';
import { getCurrentCollection } from '../../get/collection';
import { getUser } from '../../get/user/getUser';

export async function createFolder(collectionId: string, data: Exclude<Prisma.PathCreateInput, 'owner'>) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  const paths = prisma.path.findMany({
    where: { collectionId: currentCollection.id },
  });

  const requests = prisma.request.findMany({
    where: { collectionId: currentCollection.id },
  });

  await Promise.all([paths, requests]);

  const allPaths = [
    ...(await prisma.request.findMany({ where: { collectionId: currentCollection.id } })).map(request => request.path),
    ...(await prisma.path.findMany({ where: { collectionId: currentCollection.id } })).map(path => path.value),
  ];

  for (const path of allPaths) {
    if (path === '/') continue;
    if (path === data.value) throw new Error('That name has been taken');
  }

  const path = ['/', ...data.value.split('/')];

  for (let i = 0; i < path.length; i++) {
    const segment = path
      .slice(0, i + 1)
      .join('/')
      .replaceAll('//', '/')
      .replaceAll('//', '/')
      .replaceAll('//', '/')
      .replaceAll('//', '/');

    if ([...allPaths.map((d: any) => d.path || d.value)].includes(segment)) continue;

    await prisma.path.create({
      data: {
        value: segment,
        Collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });
  }
}
