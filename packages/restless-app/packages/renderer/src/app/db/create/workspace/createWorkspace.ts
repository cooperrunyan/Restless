import { getUser } from '../../get/user/getUser';
import { modifyUser } from '../../modify/user';

export async function createWorkspace(name: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const response = await prisma.workspace.create({
    data: {
      name,
      collections: {},
      owner: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  await modifyUser({
    currentWorkspaceId: response.id,
  });

  return response;
}
