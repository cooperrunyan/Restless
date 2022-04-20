import { getCurrentWorkspace } from '../workspace/getCurrentWorkspace';

export async function getCurrentCollection() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentWorkspace = await getCurrentWorkspace();

  if (!currentWorkspace?.currentCollection) return;

  const result = await prisma.collection.findMany({
    where: {
      workspaceId: currentWorkspace.id,
      id: currentWorkspace.currentCollection,
    },
  });
  prisma.$disconnect();
  return result[0];
}
