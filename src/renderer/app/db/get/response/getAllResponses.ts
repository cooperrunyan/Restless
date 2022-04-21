import { getCurrentRequest } from '../request/getCurrentRequest';

export async function getAllResponses() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const currentRequest = await getCurrentRequest();

  if (!currentRequest) return;

  const result = await prisma.response.findMany({ where: { ownerId: currentRequest.id } });

  // prisma.$disconnect();
  return result;
}
