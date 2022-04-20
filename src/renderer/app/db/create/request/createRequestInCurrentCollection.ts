import { Prisma } from '@prisma/client';
import { getCurrentCollection } from '../../get/collection';
import { createRequest } from './createRequest';

export async function createRequestInCurrentCollection(data: Exclude<Prisma.RequestCreateInput, 'owner'>) {
  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  return createRequest(currentCollection.id, data);
}
