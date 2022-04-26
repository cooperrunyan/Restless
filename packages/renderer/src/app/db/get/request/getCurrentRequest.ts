import { getCurrentCollection } from '../collection/getCurrentCollection';

export async function getCurrentRequest() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentCollection = await getCurrentCollection();

  if (!currentCollection?.currentRequest) return;

  const result = await prisma.request.findMany({
    where: {
      collectionId: currentCollection.id,
      id: currentCollection.currentRequest,
    },
    include: {
      responses: true,
    },
  });

  return result[0];
}
