import { getCurrentCollection } from '../collection/getCurrentCollection';

export async function getFoldersInCurrentCollection() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentCollection = await getCurrentCollection();

  if (!currentCollection) return;

  const result = await prisma.path.findMany({
    where: {
      collectionId: currentCollection.id,
    },
  });

  return result;
}
