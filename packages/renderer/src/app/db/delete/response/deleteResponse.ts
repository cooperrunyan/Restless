export async function deleteResponse(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const result = await prisma.response.delete({ where: { id } });

  return result;
}
