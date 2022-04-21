export async function deleteRequest(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.request.delete({ where: { id } });

  // prisma.$disconnect();
  return result;
}
