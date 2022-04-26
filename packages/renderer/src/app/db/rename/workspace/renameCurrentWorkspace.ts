import { getUser } from '../../get/user/getUser';

export async function renameCurrentWorkspace(name: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user?.currentWorkspaceId) return;

  const result = await prisma.workspace.update({
    where: {
      id: user.currentWorkspaceId!,
    },
    data: {
      name,
    },
  });

  return result;
}
