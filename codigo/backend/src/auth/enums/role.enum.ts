import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export async function getUserRole(userId: string): Promise<Role> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.admin) {
    return Role.Admin;
  }
  return Role.User;
}
