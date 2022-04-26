import { Prisma } from '@prisma/client';
import { getCurrentRequest } from '../../get/request/getCurrentRequest';

export async function modifyCurrentResponse(data: Prisma.ResponseUpdateInput) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const currentRequest = await getCurrentRequest();
  if (!currentRequest?.currentResponse) return;

  const result = await prisma.response.update({
    where: {
      id: currentRequest.currentResponse,
    },
    data,
  });

  // prisma.$disconnect();

  return result;
}
