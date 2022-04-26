import { getUser } from '../user/getUser';

export async function getSettings() {
  const prisma = window.electron.prisma;
  await prisma.$connect();
  const user = await getUser();

  if (!user) return;

  const result = await prisma.settings.findUnique({
    where: {
      userId: user.id,
    },
  });

  return result;
}
