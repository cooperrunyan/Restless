import { getCurrentCollection } from '../../get/collection';

export async function renameFolder(id: string, name: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;
  await prisma.$connect();

  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  const path = await prisma.path.findUnique({ where: { id } });
  if (!path) return;

  const data = path.value.split('/');
  data[data.length - 1] = name;

  const result = await prisma.path.update({
    where: { id },
    data: { value: data.join('/') },
  });

  const paths = prisma.path.findMany({
    where: { collectionId: currentCollection.id },
  });

  const requests = prisma.request.findMany({
    where: { collectionId: currentCollection.id },
  });

  await Promise.all([paths, requests]);


  const allPaths = [...((await paths) || []), ...((await requests) || [])].map(o => ({
    path: (o as any).value || (o as any).path,
    id: o.id,
    type: (o as any).value ? 'path' : 'request',
  }));

  if (!path) return;


  const newBase = data.join('/') + '/';
  const searchFor = path.value + '/';

  for await (const { path, id, type } of allPaths) {
    if (path.startsWith(searchFor)) {
      const newValue = path.replace(searchFor, newBase);
      if (type === 'path') await prisma.path.update({ where: { id }, data: { value: newValue } });
      else await prisma.request.update({ where: { id }, data: { path: newValue } });
    }
  }

  return result;
}
