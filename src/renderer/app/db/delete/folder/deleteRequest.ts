export async function deleteFolder(path: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const paths = prisma.path.findMany();
}
