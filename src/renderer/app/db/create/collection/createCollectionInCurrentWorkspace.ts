import { getCurrentWorkspace } from '../../get/workspace';
import { createCollection } from './createCollection';

export async function createCollectionInCurrentWorkspace(name: string) {
  const currentWorkspace = await getCurrentWorkspace();
  if (!currentWorkspace) return;

  return createCollection(currentWorkspace.id, name);
}
