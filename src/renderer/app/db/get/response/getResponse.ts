import { getCurrentRequest } from '../request/getCurrentRequest';

export async function getResponse(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentRequest = await getCurrentRequest();

  if (!currentRequest) return;

  const result = await prisma.response.findMany({
    where: {
      ownerId: currentRequest.id,
      id,
    },
  });

  // prisma.$disconnect();
  return result;
}
