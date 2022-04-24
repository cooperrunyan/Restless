import { Prisma } from '@prisma/client';
import { getCurrentCollection } from '../../get/collection';
import { createTab } from './createTab';

export async function createTabInCurrentCollection(requestId: string) {
  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  return createTab(currentCollection.id, requestId);
}
