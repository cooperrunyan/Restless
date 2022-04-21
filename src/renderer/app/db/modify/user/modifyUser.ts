import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user';

export async function modifyUser(data: Prisma.UserUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const user = await getUser();

  if (!user) return;

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data,
  });

  // prisma.$disconnect();

  return result;
}
