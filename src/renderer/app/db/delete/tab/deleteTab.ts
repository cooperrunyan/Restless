export async function deleteTab(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  return await prisma.tab.delete({ where: { id } });
}
