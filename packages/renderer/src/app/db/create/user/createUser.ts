export async function createUser() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const response = await prisma.user.create({
    data: {
      workspaces: {
        create: {},
      },
    },
  });

  // prisma.$disconnect();

  return response;
}
