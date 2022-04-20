import { getCurrentRequest } from '../request/getCurrentRequest';

export async function getCurrentResponse() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentRequest = await getCurrentRequest();

  if (!currentRequest?.currentResponse) return;

  const result = await prisma.response.findMany({
    where: {
      ownerId: currentRequest.id,
      id: currentRequest.currentResponse,
    },
  });

  prisma.$disconnect();
  return result[0];
}
