import { getCurrentCollection } from '../../get/collection';

export async function renameCurrentCollection(name: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;
  await prisma.$connect();

  const collection = await getCurrentCollection();
  if (!collection) return;

  const result = await prisma.collection.update({
    where: {
      id: collection.id,
    },
    data: {
      name,
    },
  });

  return result;
}
