import { Prisma } from '@prisma/client';
import { getCurrentWorkspace } from '../../get/workspace';
import { createCollection } from './createCollection';

export async function createCollectionInCurrentWorkspace(data: Prisma.CollectionCreateInput) {
  const currentWorkspace = await getCurrentWorkspace();
  if (!currentWorkspace) return;

  return createCollection(currentWorkspace.id, data);
}
