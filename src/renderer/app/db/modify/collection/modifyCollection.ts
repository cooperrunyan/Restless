import { Prisma } from '@prisma/client';

export async function modifyCollection(id: string, data: Prisma.CollectionUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.collection.update({
    where: {
      id,
    },
    data,
  });

  prisma.$disconnect();

  return result;
}
