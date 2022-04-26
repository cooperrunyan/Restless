import { Prisma } from '@prisma/client';

export async function modifyWorkspace(id: string, data: Prisma.WorkspaceUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.workspace.update({
    where: {
      id,
    },
    data,
  });

  // prisma.$disconnect();

  return result;
}
