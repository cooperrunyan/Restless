import { getCurrentWorkspace } from '../workspace/getCurrentWorkspace';

export async function getCollection(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentWorkspace = await getCurrentWorkspace();

  if (!currentWorkspace) return;

  const result = await prisma.collection.findMany({
    where: {
      workspaceId: currentWorkspace.id,
      id,
    },
    include: {
      paths: true
    }
  });

  prisma.$disconnect();
  return result[0];
}
