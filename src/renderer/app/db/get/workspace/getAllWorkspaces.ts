export async function getAllWorkspaces() {
  const prisma = window.electron.prisma;
  await prisma.$connect();
  const result = await prisma.workspace.findMany({});
  // prisma.$disconnect();
  return result;
}
