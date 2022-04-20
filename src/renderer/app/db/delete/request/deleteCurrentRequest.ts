import { getCurrentCollection } from '../../get/collection/getCurrentCollection';
import { modifyCurrentCollection } from '../../modify/collection/modifyCurrentCollection';

export async function deleteCurrentRequest() {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const collection = await getCurrentCollection();
  if (!collection?.currentRequest) return;

  const result = await prisma.request.delete({ where: { id: collection.currentRequest } });
  await modifyCurrentCollection({ currentRequest: null });

  prisma.$disconnect();
  return result;
}
