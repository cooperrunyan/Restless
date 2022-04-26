import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function modifySettings(data: Prisma.SettingsUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const user = await getUser();
  if (!user) return;

  const result = await prisma.settings.update({
    where: {
      userId: user.id,
    },
    data,
  });

  return result;
}
