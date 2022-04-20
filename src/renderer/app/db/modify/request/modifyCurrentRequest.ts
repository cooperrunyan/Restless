import { Prisma } from '@prisma/client';
import { getCurrentCollection } from '../../get/collection/getCurrentCollection';

export async function modifyCurrentRequest(data: Prisma.RequestUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const currentCollection = await getCurrentCollection();
  if (!currentCollection?.currentRequest) return;

  const result = await prisma.request.update({
    where: {
      id: currentCollection.currentRequest,
    },
    data,
  });

  prisma.$disconnect();

  return result;
}
