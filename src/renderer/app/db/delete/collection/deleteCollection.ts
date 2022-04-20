export async function deleteCollection(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.collection.delete({ where: { id } });

  prisma.$disconnect();
  return result;
}
