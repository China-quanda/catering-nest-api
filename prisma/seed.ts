import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // ... you will write your Prisma Client queries here
  // 初始化机构管理数据
  if ((await prisma.user.count()) <= 0) {
    const result = await prisma.user.create({
      data: {
        phone:'18684868151',
        name:'小螺丝',
        sex:1,
        password:'123456'
      }
    })
    console.log('初始化用户数据-result', result);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
