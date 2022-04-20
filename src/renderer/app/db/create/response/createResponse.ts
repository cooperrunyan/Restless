import { Prisma } from '@prisma/client';
import { getUser } from '../../get/user/getUser';

export async function createResponse(requestId: string, data: Prisma.ResponseCreateInput) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await getUser();
  if (!user) return;

  const response = await prisma.response.create({
    data: {
      ...data,
      owner: {
        connect: {
          id: requestId,
        },
      },
    },
  });

  prisma.$disconnect();

  return response;
}
