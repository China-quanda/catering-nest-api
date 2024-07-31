import { PrismaClient, Shop, Table, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  // ... you will write your Prisma Client queries here
  let user: User;
  let shop: Shop;
  // 初始化用户管理数据
  if ((await prisma.user.count()) <= 0) {
    const salt = await bcrypt.genSalt();
    const result = await prisma.user.create({
      data: {
        phone: 18684868151,
        name: '小螺丝',
        sex: 1,
        password: await bcrypt.hash('12345678', salt),
      },
    });
    user = result;
    console.log('初始化用户数据-result', result);
  }
  // 初始化商铺管理数据
  if ((await prisma.shop.count()) <= 0) {
    const result = await prisma.shop.create({
      data: {
        no: 1000,
        logo: 'logo',
        latitude: '123456',
        longitude: '123456',
        country: '中国',
        province: '湖南省',
        city: '郴州市',
        district: '北湖区',
        street: '燕泉街道',
        streetNum: '275号',
        cityCode: '431024',
      },
    });
    shop = result;
    console.log('初始化商铺数据-result', result);
  }
  // 初始化餐桌管理数据
  if ((await prisma.table.count()) <= 0) {
    const result = await prisma.table.createMany({
      data: [
        {
          no: 'NO01',
          name: '一号桌',
          qrCode: 'qrCode',
          shopId: shop.id,
        },
        {
          no: 'NO02',
          name: '二号桌',
          qrCode: 'qrCode',
          shopId: shop.id,
        },
        {
          no: 'NO03',
          name: '三号桌',
          qrCode: 'qrCode',
          shopId: shop.id,
        },
        {
          no: 'NO04',
          name: '四号桌',
          qrCode: 'qrCode',
          shopId: shop.id,
        },
        {
          no: 'NO05',
          name: '五号桌',
          qrCode: 'qrCode',
          shopId: shop.id,
        },
        {
          no: 'NO06',
          name: '六号桌',
          qrCode: 'qrCode',
          shopId: shop.id,
        },
      ],
    });
    console.log('初始化餐桌数据-result', result);
  }
  // 初始化产品类别数据
  if ((await prisma.category.count()) <= 0) {
    const result = await prisma.category.createMany({
      data: [
        {
          name: '套餐',
          shopId: shop.id,
        },
        {
          name: '主食',
          shopId: shop.id,
        },
        {
          name: '加菜',
          shopId: shop.id,
        },
        {
          name: '卤味',
          shopId: shop.id,
        },
        {
          name: '饮料',
          shopId: shop.id,
        },
      ],
    });
    console.log('初始化产品类别数据-result', result);
  }
  // 初始化产品类别数据
  if ((await prisma.product.count()) <= 0) {
    const result = await prisma.product.createMany({
      data: [
        {
          name: '套餐A-原味螺蛳粉+带皮鸭脚+海带结',
          categoryId: 1,
          originalPrice: '18.88',
          currentPrice: '13',
          pictures: ['1', '2', '3'],
        },
        {
          name: '套餐B-原味螺蛳粉+丸子+油豆腐+豆奶',
          categoryId: 1,
          originalPrice: '22.88',
          currentPrice: '15',
          pictures: ['1', '2', '3'],
        },
        {
          name: '套餐C-原味螺蛳粉+蛋+香肠+酸梅汁/豆奶',
          categoryId: 1,
          originalPrice: '25.88',
          currentPrice: '18',
          pictures: ['1', '2', '3'],
        },
        {
          name: '套餐D-原味螺蛳粉+秘制牛腩+豆腐块/腐竹',
          categoryId: 1,
          originalPrice: '25.88',
          currentPrice: '18',
          pictures: ['1', '2', '3'],
        },
        {
          name: '套餐E-原味螺蛳粉+莲藕+鸭腿',
          categoryId: 1,
          originalPrice: '25.88',
          currentPrice: '18',
          pictures: ['1', '2', '3'],
        },
        {
          name: '原味螺蛳粉',
          categoryId: 2,
          originalPrice: '15',
          currentPrice: '12',
          pictures: ['1', '2', '3'],
        },
        {
          name: '干捞螺蛳粉',
          categoryId: 2,
          originalPrice: '15',
          currentPrice: '12',
          pictures: ['1', '2', '3'],
        },
        {
          name: '招牌螺蛳粉',
          categoryId: 2,
          originalPrice: '15',
          currentPrice: '12',
          pictures: ['1', '2', '3'],
        },
        {
          name: '桂林米粉',
          categoryId: 2,
          originalPrice: '15',
          currentPrice: '12',
          pictures: ['1', '2', '3'],
        },
        {
          name: '炸鸭脚',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '炸蛋',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '腐竹',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '酸笋',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '木耳',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '炸花生',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '海带丝',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '卤蛋',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '炸猪脚',
          categoryId: 3,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭心',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭爪',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭肝',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭翅',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭脖',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭腿',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭架',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '莲藕',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭珍',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭头',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '鸭舌',
          categoryId: 4,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '绿豆沙',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '酸梅汁',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '豆奶',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '可乐',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '啤酒',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '矿泉水',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '红茶',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '绿茶',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
        {
          name: '柠檬茶',
          categoryId: 5,
          originalPrice: '4',
          currentPrice: '3',
          pictures: ['1', '2', '3'],
        },
      ],
    });
    console.log('初始化产品类别数据-result', result);
  }
  // 初始化产用户地址数据
  if ((await prisma.userAddress.count()) <= 0) {
    const result = await prisma.userAddress.create({
      data: {
        name: 'name',
        sex: 1,
        phone: '18684868151',
        isDefault: false,
        latitude: '123456',
        longitude: '123456',
        country: '中国',
        province: '湖南省',
        city: '郴州市',
        district: '北湖区',
        street: '燕泉街道',
        streetNum: '275号',
        cityCode: '431024',
        userId: user.id,
      },
    });
    console.log('初始化产用户地址数据-result', result);
  }
  // 初始化商铺员工数据
  if ((await prisma.employee.count()) <= 0) {
    const result = await prisma.employee.createMany({
      data: [
        {
          name: '郭双',
          sex: 2,
          phone: '18684868151',
          maritalStatus: 2,
          entryDate: new Date(),
          shopId: shop?.id || 1,
        },
        {
          name: '郭又又',
          sex: 2,
          phone: '18684868152',
          maritalStatus: 1,
          entryDate: new Date(),
          shopId: shop?.id || 1,
        },
        {
          name: '张三',
          sex: 1,
          phone: '18684868151',
          maritalStatus: 3,
          entryDate: new Date(),
          shopId: shop?.id || 1,
        },
      ],
    });
    console.log('初始化产用户地址数据-result', result);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
