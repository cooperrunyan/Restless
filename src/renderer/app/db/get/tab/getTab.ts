export async function getTab(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return null;

  return await prisma.tab.findUnique({ where: { id }, include: { Request: {} } });
}
