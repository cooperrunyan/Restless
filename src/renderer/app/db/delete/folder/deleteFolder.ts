import { getCurrentCollection } from '../../get/collection';

export async function deleteFolder(id: string) {
  const prisma = window.electron.prisma;
  if (!prisma) return;

  const currentCollection = await getCurrentCollection();
  if (!currentCollection) return;

  const p = prisma.path.findUnique({
    where: { id },
  });

  const paths = prisma.path.findMany({
    where: { collectionId: currentCollection.id },
  });

  const requests = prisma.request.findMany({
    where: { collectionId: currentCollection.id },
  });

  await Promise.all([paths, requests, p]);
  const allPaths = [...((await paths) || []), ...((await requests) || [])];
  const path = await p;

  if (!path) return;

  try {
    for (const p of allPaths) {
      const data = p as any;
      if (data.path) {
        if ((data.path as string)?.startsWith(path.value + '/') || data.path === path.value) {
          await prisma.request.delete({ where: { id: data.id } });
        }
      } else if (data.value) {
        if ((data.value as string)?.startsWith(path.value + '/') || data.value === path.value) {
          await prisma.path.delete({ where: { id: data.id } });
        }
      }
    }
  } catch {}
}
