import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

async function main() {
  // Test database connection first
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('Failed to connect to database. Aborting seed operation.');
    process.exit(1);
  }

  console.log('Starting seed...');

  // Clear existing data
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verificationToken.deleteMany();

  // Create admin user
  const adminPassword = await hash('password123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
      addresses: {
        create: {
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'USA',
          isDefault: true,
        },
      },
      cart: {
        create: {},
      },
    },
  });

  // Create categories using images from public/images folder
  const tshirtCategory = await prisma.category.create({
    data: {
      name: 'T-shirt',
      description: 'Comfortable and stylish t-shirts',
      slug: 't-shirt',
      image: '/images/c-tshirts.jpg',
    },
  });

  const jeansCategory = await prisma.category.create({
    data: {
      name: 'Jeans',
      description: 'Durable and fashionable jeans',
      slug: 'jeans',
      image: '/images/c-jeans.jpg',
    },
  });

  const shoesCategory = await prisma.category.create({
    data: {
      name: 'Shoes',
      description: 'Footwear for every occasion',
      slug: 'shoes',
      image: '/images/c-shoes.jpg',
    },
  });

  // Create T-shirt products
  const tshirt1 = await prisma.product.create({
    data: {
      name: 'Classic Cotton T-shirt',
      description: 'Soft and comfortable cotton t-shirt for everyday wear',
      price: 24.99,
      comparePrice: 29.99,
      sku: 'TS-001',
      inventory: 100,
      images: [
        '/images/p11-1.jpg',
        '/images/p11-2.jpg',
      ],
      slug: 'classic-cotton-tshirt',
      categoryId: tshirtCategory.id,
      variants: {
        create: [
          {
            name: 'White / S',
            price: 24.99,
            inventory: 30,
            sku: 'TS-001-WHT-S',
            options: {
              color: 'White',
              size: 'S',
            },
          },
          {
            name: 'White / M',
            price: 24.99,
            inventory: 35,
            sku: 'TS-001-WHT-M',
            options: {
              color: 'White',
              size: 'M',
            },
          },
          {
            name: 'White / L',
            price: 24.99,
            inventory: 35,
            sku: 'TS-001-WHT-L',
            options: {
              color: 'White',
              size: 'L',
            },
          },
        ],
      },
    },
  });

  const tshirt2 = await prisma.product.create({
    data: {
      name: 'Premium Graphic T-shirt',
      description: 'Eye-catching graphic t-shirt with unique designs',
      price: 34.99,
      comparePrice: 39.99,
      sku: 'TS-002',
      inventory: 80,
      images: [
        '/images/p12-1.jpg',
        '/images/p12-2.jpg',
      ],
      slug: 'premium-graphic-tshirt',
      categoryId: tshirtCategory.id,
      variants: {
        create: [
          {
            name: 'Black / S',
            price: 34.99,
            inventory: 25,
            sku: 'TS-002-BLK-S',
            options: {
              color: 'Black',
              size: 'S',
            },
          },
          {
            name: 'Black / M',
            price: 34.99,
            inventory: 30,
            sku: 'TS-002-BLK-M',
            options: {
              color: 'Black',
              size: 'M',
            },
          },
          {
            name: 'Black / L',
            price: 34.99,
            inventory: 25,
            sku: 'TS-002-BLK-L',
            options: {
              color: 'Black',
              size: 'L',
            },
          },
        ],
      },
    },
  });

  // Create Jeans products
  const jeans1 = await prisma.product.create({
    data: {
      name: 'Classic Slim Fit Jeans',
      description: 'Timeless slim fit jeans that offer both comfort and style',
      price: 59.99,
      comparePrice: 69.99,
      sku: 'JN-001',
      inventory: 75,
      images: [
        '/images/p21-1.jpg',
        '/images/p21-2.jpg',
      ],
      slug: 'classic-slim-fit-jeans',
      categoryId: jeansCategory.id,
      variants: {
        create: [
          {
            name: 'Blue / 30',
            price: 59.99,
            inventory: 25,
            sku: 'JN-001-BLU-30',
            options: {
              color: 'Blue',
              size: '30',
            },
          },
          {
            name: 'Blue / 32',
            price: 59.99,
            inventory: 25,
            sku: 'JN-001-BLU-32',
            options: {
              color: 'Blue',
              size: '32',
            },
          },
          {
            name: 'Blue / 34',
            price: 59.99,
            inventory: 25,
            sku: 'JN-001-BLU-34',
            options: {
              color: 'Blue',
              size: '34',
            },
          },
        ],
      },
    },
  });

  const jeans2 = await prisma.product.create({
    data: {
      name: 'Distressed Skinny Jeans',
      description: 'Modern skinny jeans with stylish distressed details',
      price: 69.99,
      comparePrice: 79.99,
      sku: 'JN-002',
      inventory: 60,
      images: [
        '/images/p22-1.jpg',
        '/images/p22-2.jpg',
      ],
      slug: 'distressed-skinny-jeans',
      categoryId: jeansCategory.id,
      variants: {
        create: [
          {
            name: 'Light Blue / 30',
            price: 69.99,
            inventory: 20,
            sku: 'JN-002-LBL-30',
            options: {
              color: 'Light Blue',
              size: '30',
            },
          },
          {
            name: 'Light Blue / 32',
            price: 69.99,
            inventory: 20,
            sku: 'JN-002-LBL-32',
            options: {
              color: 'Light Blue',
              size: '32',
            },
          },
          {
            name: 'Light Blue / 34',
            price: 69.99,
            inventory: 20,
            sku: 'JN-002-LBL-34',
            options: {
              color: 'Light Blue',
              size: '34',
            },
          },
        ],
      },
    },
  });

  // Create Shoes products
  const shoes1 = await prisma.product.create({
    data: {
      name: 'Casual Canvas Sneakers',
      description: 'Versatile canvas sneakers perfect for everyday wear',
      price: 49.99,
      comparePrice: 59.99,
      sku: 'SH-001',
      inventory: 90,
      images: [
        '/images/p31-1.jpg',
        '/images/p31-2.jpg',
      ],
      slug: 'casual-canvas-sneakers',
      categoryId: shoesCategory.id,
      variants: {
        create: [
          {
            name: 'White / 8',
            price: 49.99,
            inventory: 15,
            sku: 'SH-001-WHT-8',
            options: {
              color: 'White',
              size: '8',
            },
          },
          {
            name: 'White / 9',
            price: 49.99,
            inventory: 20,
            sku: 'SH-001-WHT-9',
            options: {
              color: 'White',
              size: '9',
            },
          },
          {
            name: 'White / 10',
            price: 49.99,
            inventory: 15,
            sku: 'SH-001-WHT-10',
            options: {
              color: 'White',
              size: '10',
            },
          },
        ],
      },
    },
  });

  const shoes2 = await prisma.product.create({
    data: {
      name: 'Sport Running Shoes',
      description: 'High-performance running shoes with advanced cushioning',
      price: 89.99,
      comparePrice: 99.99,
      sku: 'SH-002',
      inventory: 70,
      images: [
        '/images/p32-1.jpg',
        '/images/p32-2.jpg',
      ],
      slug: 'sport-running-shoes',
      categoryId: shoesCategory.id,
      variants: {
        create: [
          {
            name: 'Black / 8',
            price: 89.99,
            inventory: 15,
            sku: 'SH-002-BLK-8',
            options: {
              color: 'Black',
              size: '8',
            },
          },
          {
            name: 'Black / 9',
            price: 89.99,
            inventory: 20,
            sku: 'SH-002-BLK-9',
            options: {
              color: 'Black',
              size: '9',
            },
          },
          {
            name: 'Black / 10',
            price: 89.99,
            inventory: 15,
            sku: 'SH-002-BLK-10',
            options: {
              color: 'Black',
              size: '10',
            },
          },
        ],
      },
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Best t-shirt I\'ve ever owned. So comfortable!',
      userId: user.id,
      productId: tshirt1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Great jeans, perfect fit.',
      userId: user.id,
      productId: jeans1.id,
    },
  });

  // Add item to user's cart
  const userCart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (userCart) {
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: userCart.id,
        productId: shoes1.id,
        variantId: (await prisma.productVariant.findFirst({
          where: { productId: shoes1.id },
        }))?.id,
      },
    });
  }

  // Create an order
  const userAddress = await prisma.address.findFirst({ where: { userId: user.id } });
  if (userAddress) {
    const tshirtVariant = await prisma.productVariant.findFirst({
      where: { sku: 'TS-001-WHT-M' },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-10001',
        status: 'DELIVERED',
        total: 54.99,
        subtotal: 24.99,
        tax: 5.00,
        shipping: 25.00,
        userId: user.id,
        addressId: userAddress.id,
        items: {
          create: [
            {
              quantity: 1,
              price: 24.99,
              name: 'Classic Cotton T-shirt',
              sku: 'TS-001-WHT-M',
              productId: tshirt1.id,
              variantId: tshirtVariant?.id,
            },
          ],
        },
        payment: {
          create: {
            amount: 54.99,
            paymentMethod: 'Credit Card',
            status: 'COMPLETED',
            stripePaymentId: 'pi_mock_123456',
            userId: user.id,
          },
        },
      },
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 