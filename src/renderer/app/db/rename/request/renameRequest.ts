export async function renameRequest(id: string, name: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;
  await prisma.$connect();

  const request = await prisma.request.findUnique({ where: { id } });
  if (!request) return;

  const data = request.path.split('/');
  data[data.length - 1] = name;

  const result = await prisma.request.update({
    where: { id },
    data: { path: data.join('/'), name },
  });

  return result;
}
