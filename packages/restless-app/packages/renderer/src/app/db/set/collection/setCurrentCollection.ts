import { getCurrentWorkspace } from '../../get/workspace/getCurrentWorkspace';

export async function setCurrentCollection(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const workspace = await getCurrentWorkspace();

  if (!workspace) return;

  const result = await prisma.workspace.update({
    where: {
      id: workspace.id,
    },
    data: {
      currentCollection: id,
    },
  });

  return result;
}
