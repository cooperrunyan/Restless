import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function modifyCurrentWorkspace(data: Prisma.WorkspaceUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const user = await getUser();
  if (!user?.currentWorkspaceId) return;

  const result = await prisma.workspace.update({
    where: {
      id: user.currentWorkspaceId,
    },
    data,
  });

  // prisma.$disconnect();

  return result;
}
