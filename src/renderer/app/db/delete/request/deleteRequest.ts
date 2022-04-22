export async function deleteRequest(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  try {
    await prisma.request.delete({ where: { id } });
  } catch {
    return;
  }

  return true;
}
