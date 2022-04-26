export async function createUser() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const response = await prisma.user.create({
    data: {
      workspaces: {
        create: {
          name: 'My Workspace',
        },
      },
    },
  });

  // prisma.$disconnect();

  return response;
}
