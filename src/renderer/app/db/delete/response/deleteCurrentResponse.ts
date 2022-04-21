import { getCurrentRequest } from '../../get/request/getCurrentRequest';
import { modifyCurrentRequest } from '../../modify/request/modifyCurrentRequest';

export async function deleteCurrentResponse() {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const request = await getCurrentRequest();
  if (!request?.currentResponse) return;

  const result = await prisma.response.delete({ where: { id: request.currentResponse } });
  await modifyCurrentRequest({ currentResponse: null });

  // prisma.$disconnect();
  return result;
}
