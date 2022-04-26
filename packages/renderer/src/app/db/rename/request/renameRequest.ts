import { getCurrentCollection } from '../../get/collection';

export async function renameRequest(id: string, name: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;
  await prisma.$connect();

  const collection = await getCurrentCollection();
  if (!collection) return;

  const request = await prisma.request.findUnique({ where: { id } });
  if (!request) return;

  const allPaths = [
    ...(await prisma.request.findMany({ where: { collectionId: collection.id } })).map(request => request.path),
    ...(await prisma.path.findMany({ where: { collectionId: collection.id } })).map(path => path.value),
  ];

  for (const path of allPaths) {
    if (path === name) throw new Error('That name has been taken');
  }

  const data = request.path.split('/');
  data[data.length - 1] = name;

  const result = await prisma.request.update({
    where: { id },
    data: { path: data.join('/'), name },
  });

  return result;
}
