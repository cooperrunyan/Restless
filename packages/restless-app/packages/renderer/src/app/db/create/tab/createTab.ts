export async function createTab(collectionId: string, requestId: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const exists = !!(await prisma.tab.findFirst({
    where: {
      collectionId,
      requestId,
    },
  }));

  if (exists) return;

  return await prisma.tab.create({
    data: {
      collectionId,
      requestId,
    },
  });
}
