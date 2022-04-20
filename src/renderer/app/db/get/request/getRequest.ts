import { getCurrentCollection } from '../collection/getCurrentCollection';

export async function getRequest(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentCollection = await getCurrentCollection();

  if (!currentCollection) return;

  const result = await prisma.request.findMany({
    where: {
      collectionId: currentCollection.id,
      id,
    },
    include: {
      responses: true,
    },
  });

  prisma.$disconnect();
  return result;
}
