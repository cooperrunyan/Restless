export async function getUser() {
  const prisma = window.electron.prisma;
  await prisma.$connect();

  const user = await prisma.user.findFirst({
    include: {
      workspaces: {
        include: {
          owner: true,
          collections: {
            include: {
              children: true,
              owner: true,
            },
          },
        },
      },
    },
  });

  // prisma.$disconnect();
  return user;
}
