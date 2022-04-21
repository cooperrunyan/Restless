export async function getWorkspace(id: string) {
  const prisma = window.electron.prisma;
  await prisma.$connect();
  const result = await prisma.workspace.findUnique({
    where: {
      id,
    },
  });
  // prisma.$disconnect();
  return result;
}
