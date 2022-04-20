import { Prisma } from '@prisma/client';

export async function modifyRequest(id: string, data: Prisma.RequestUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.request.update({
    where: {
      id,
    },
    data,
  });

  prisma.$disconnect();

  return result;
}
