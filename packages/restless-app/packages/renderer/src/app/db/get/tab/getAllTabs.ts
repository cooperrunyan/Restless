import { getCurrentCollection } from '../collection';

export async function getAllTabs() {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  return await prisma.tab.findMany({ where: { collectionId: currentCollection.id }, include: { Request: {} } });
}
