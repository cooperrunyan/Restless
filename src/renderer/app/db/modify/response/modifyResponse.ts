import { Prisma } from '@prisma/client';

export async function modifyResponse(id: string, data: Prisma.ResponseUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.response.update({
    where: {
      id,
    },
    data,
  });

  prisma.$disconnect();

  return result;
}
