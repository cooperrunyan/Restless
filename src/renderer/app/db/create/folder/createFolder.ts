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
  const allPaths = [...((await paths) || []), ...((await requests) || [])];

  for (const p of allPaths) {
    if ((p as any).value) {
      if ((p as any).value === data.value) throw new Error('That name has been taken.');
    }
    if ((p as any).path) {
      if ((p as any).path === data.value) throw new Error('That name has been taken.');
    }
  }

  const path = ['/', ...data.value.split('/')];

  const segments = [];

  for (let i = 0; i < path.length; i++) {
    const segment = path
      .slice(0, i + 1)
      .join('/')
      .replaceAll('//', '/');

    console.log(
      segment,
      ['/', '', ...allPaths.map((d: any) => d.path || d.value)],
      ['/', '', ...allPaths.map((d: any) => d.path || d.value)].includes(segment),
    );

    if (['/', '', ...allPaths.map((d: any) => d.path || d.value)].includes(segment)) continue;

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
