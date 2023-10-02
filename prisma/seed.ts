import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashData(password) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

const userData: Prisma.UserCreateInput[] = [
  {
    login: 'yadjdiva',
    password: '',
  },
  {
    login: 'admin',
    password: '',
    role: 'ADMIN',
  },
  {
    login: 'superadmin',
    password: '',
    role: 'ADMIN',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const hashedPasswords = await Promise.all(
    userData.map(async (user) => {
      const hashedPassword = await hashData('qwertyuiop');
      return hashedPassword;
    }),
  );

  userData.forEach((user, index) => {
    user.password = hashedPasswords[index];
  });

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });