import { getCurrentCollection } from '../get/collection';

export async function moveXintoY(xId: string, yId: string) {
  const prisma = window.electron.prisma;
  if (!prisma) throw new Error('Prisma not connected');

  const currentCollection = await getCurrentCollection();
  if (!currentCollection) throw new Error('No current collection selected');

  const toPath = await prisma.path.findUnique({ where: { id: yId } });
  if (!toPath) throw new Error('Element to move into was not found');

  const request = await prisma.request.findUnique({ where: { id: xId } });

  const data = request || (await prisma.path.findUnique({ where: { id: xId } }));
  if (!data) throw new Error('Element to move was not found');

  const path: string = (data as any).path || (data as any).value;
  const name = path.split('/').at(-1);

  if (toPath.value.startsWith(path)) throw new Error('You cannot move an element into one of its children');

  if ((data as any).value) {
    // Is Path
    await prisma.path.update({
      where: { id: xId },
      data: { value: (toPath.value + '/' + name).replaceAll('//', '/').replaceAll('//', '/').replaceAll('//', '/') },
    });
  } else {
    // is request
    await prisma.request.update({
      where: { id: xId },
      data: { path: (toPath.value + '/' + name).replaceAll('//', '/').replaceAll('//', '/').replaceAll('//', '/'), name },
    });
  }

  ///// Update all paths

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

  const newBase = toPath.value;
  const searchFor = path;

  for await (const { path, id, type } of allPaths) {
    if (path.startsWith(searchFor)) {
      if (toPath.value + '/' + path.split('/').at(-1) === path) throw new Error('The element already exists in that location');

      const newValue = newBase + path;
      if (type === 'path') await prisma.path.update({ where: { id }, data: { value: newValue } });
      else await prisma.request.update({ where: { id }, data: { path: newValue } });
    }
  }
}
