export async function deleteWorkspace(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.workspace.delete({ where: { id } });

  // prisma.$disconnect();
  return result;
}
