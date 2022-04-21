import { getCurrentRequest } from '../../get/request/getCurrentRequest';

export async function setCurrentResponse(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const request = await getCurrentRequest();

  if (!request) return;

  const result = await prisma.request.update({
    where: {
      id: request.id,
    },
    data: {
      currentResponse: id,
    },
  });

  // prisma.$disconnect();

  return result;
}
