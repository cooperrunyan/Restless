import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function createFolder(collectionId: string, data: Exclude<Prisma.PathCreateInput, 'owner'>) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const allPaths = await prisma.path.findMany({});

  for (const { value } of allPaths) {
    if (value === data.value) throw new Error('That name has been taken.');
  }

  function slice(string: string) {
    return string.split('/');
  }

  const path = ['/', ...slice(data.value)];

  const segments = [];

  for (let i = 0; i < path.length; i++) {
    const segment = path
      .slice(0, i + 1)
      .join('/')
      .replaceAll('//', '/');
    segments.push(
      prisma.path.create({
        data: {
          value: segment,
          Collection: {
            connect: {
              id: collectionId,
            },
          },
        },
      }),
    );
  }

  return await Promise.all(segments);
}
