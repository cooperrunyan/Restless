import { getUser } from '../../get/user/getUser';
import { modifyUser } from '../../modify/user/modifyUser';

export async function deleteCurrentWorkspace() {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const { id } = (await getUser()) || {};
  if (!id) return;

  const result = await prisma.workspace.delete({ where: { id } });
  await modifyUser({ currentWorkspaceId: null });

  return result;
}
