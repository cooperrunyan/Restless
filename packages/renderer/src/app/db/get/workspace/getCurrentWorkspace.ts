import { getUser } from '../user/getUser';

export async function getCurrentWorkspace() {
  const prisma = window.electron.prisma;
  await prisma.$connect();
  const id = (await getUser())?.currentWorkspaceId;

  if (!id) return;

  const result = await prisma.workspace.findUnique({
    where: {
      id,
    },
  });

  // prisma.$disconnect();

  return result;
}
