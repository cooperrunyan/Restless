import { getCurrentWorkspace } from '../../get/workspace/getCurrentWorkspace';
import { modifyCurrentWorkspace } from '../../modify/workspace/modifyCurrentWorkspace';

export async function deleteCurrentCollection() {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const workspace = await getCurrentWorkspace();
  if (!workspace?.currentCollection) return;

  const result = await prisma.collection.delete({ where: { id: workspace.currentCollection } });
  await modifyCurrentWorkspace({ currentCollection: null });

  // prisma.$disconnect();
  return result;
}
