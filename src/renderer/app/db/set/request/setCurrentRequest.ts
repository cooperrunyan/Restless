import { getCurrentCollection } from '../../get/collection/getCurrentCollection';

export async function setCurrentRequest(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const collection = await getCurrentCollection();

  if (!collection) return;

  const result = await prisma.collection.update({
    where: {
      id: collection.id,
    },
    data: {
      currentRequest: id,
    },
  });

  prisma.$disconnect();

  return result;
}
