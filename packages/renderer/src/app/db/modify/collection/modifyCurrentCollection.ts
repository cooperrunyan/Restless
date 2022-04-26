import { Prisma } from '@prisma/client';
import { getCurrentWorkspace } from '../../get/workspace/getCurrentWorkspace';

export async function modifyCurrentCollection(data: Prisma.CollectionUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const currentWorkspace = await getCurrentWorkspace();
  if (!currentWorkspace?.currentCollection) return;

  const result = await prisma.collection.update({
    where: {
      id: currentWorkspace.currentCollection,
    },
    data,
  });

  return result;
}
