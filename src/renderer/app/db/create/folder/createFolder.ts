import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function createFolder(collectionId: string, data: Exclude<Prisma.PathCreateInput, 'owner'>) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const path = ['/', ...data.value.split('/').slice(0, -1)];
  const segments = [];

  for (let i = 0; i < path.length; i++) {
    const segment = path.slice(0, i + 1).join('/');
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
