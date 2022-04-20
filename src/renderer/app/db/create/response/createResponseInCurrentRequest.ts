import { Prisma } from '@prisma/client';
import { getCurrentCollection } from '../../get/collection';
import { createResponse } from './createResponse';

export async function createResponseInCurrentRequest(data: Prisma.ResponseCreateInput) {
  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  return createResponse(currentCollection.id, data);
}
