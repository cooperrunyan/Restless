import { Prisma } from '@prisma/client';
import { getCurrentCollection } from '../../get/collection';
import { createFolder } from './createFolder';

export async function createFolderInCurrentCollection(data: Prisma.PathCreateInput) {
  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  return createFolder(currentCollection.id, data);
}
