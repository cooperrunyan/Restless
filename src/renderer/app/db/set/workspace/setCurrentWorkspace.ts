import { getUser } from '../../get/user/getUser';

export async function setCurrentWorkspace(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();

  if (!user) return;

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      currentWorkspaceId: id,
    },
  });

  prisma.$disconnect();

  return result;
}
