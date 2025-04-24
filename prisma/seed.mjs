import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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

  // Create categories
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070',
    },
  });

  const clothingCategory = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Apparel and fashion items',
      slug: 'clothing',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070',
    },
  });

  const homeCategory = await prisma.category.create({
    data: {
      name: 'Home & Kitchen',
      description: 'Home goods and kitchen appliances',
      slug: 'home-kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-bda9f10c11e4?q=80&w=2070',
    },
  });

  // Create products with variants
  const smartphone = await prisma.product.create({
    data: {
      name: 'Premium Smartphone',
      description: 'Latest model smartphone with advanced features',
      price: 999.99,
      comparePrice: 1099.99,
      sku: 'PHONE-001',
      inventory: 100,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080',
        'https://images.unsplash.com/photo-1592434134753-a70baf7979d5?q=80&w=2070',
      ],
      slug: 'premium-smartphone',
      categoryId: electronicsCategory.id,
      variants: {
        create: [
          {
            name: 'Black / 128GB',
            price: 999.99,
            inventory: 50,
            sku: 'PHONE-001-BLK-128',
            options: {
              color: 'Black',
              storage: '128GB',
            },
          },
          {
            name: 'Silver / 256GB',
            price: 1099.99,
            inventory: 30,
            sku: 'PHONE-001-SLV-256',
            options: {
              color: 'Silver',
              storage: '256GB',
            },
          },
          {
            name: 'Blue / 512GB',
            price: 1199.99,
            inventory: 20,
            sku: 'PHONE-001-BLU-512',
            options: {
              color: 'Blue',
              storage: '512GB',
            },
          },
        ],
      },
    },
  });

  const laptop = await prisma.product.create({
    data: {
      name: 'Ultrabook Laptop',
      description: 'Thin and lightweight laptop for professionals',
      price: 1499.99,
      sku: 'LAPTOP-001',
      inventory: 50,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071',
        'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=2078',
      ],
      slug: 'ultrabook-laptop',
      categoryId: electronicsCategory.id,
      variants: {
        create: [
          {
            name: 'i5 / 8GB / 256GB',
            price: 1499.99,
            inventory: 25,
            sku: 'LAPTOP-001-I5-8-256',
            options: {
              processor: 'i5',
              ram: '8GB',
              storage: '256GB SSD',
            },
          },
          {
            name: 'i7 / 16GB / 512GB',
            price: 1899.99,
            inventory: 15,
            sku: 'LAPTOP-001-I7-16-512',
            options: {
              processor: 'i7',
              ram: '16GB',
              storage: '512GB SSD',
            },
          },
          {
            name: 'i9 / 32GB / 1TB',
            price: 2399.99,
            inventory: 10,
            sku: 'LAPTOP-001-I9-32-1TB',
            options: {
              processor: 'i9',
              ram: '32GB',
              storage: '1TB SSD',
            },
          },
        ],
      },
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: 'Premium Cotton T-shirt',
      description: 'Soft and comfortable cotton t-shirt',
      price: 24.99,
      comparePrice: 29.99,
      sku: 'TSHIRT-001',
      inventory: 200,
      images: [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080',
      ],
      slug: 'premium-cotton-tshirt',
      categoryId: clothingCategory.id,
      variants: {
        create: [
          {
            name: 'White / S',
            price: 24.99,
            inventory: 40,
            sku: 'TSHIRT-001-WHT-S',
            options: {
              color: 'White',
              size: 'S',
            },
          },
          {
            name: 'White / M',
            price: 24.99,
            inventory: 40,
            sku: 'TSHIRT-001-WHT-M',
            options: {
              color: 'White',
              size: 'M',
            },
          },
          {
            name: 'Black / S',
            price: 24.99,
            inventory: 40,
            sku: 'TSHIRT-001-BLK-S',
            options: {
              color: 'Black',
              size: 'S',
            },
          },
          {
            name: 'Black / M',
            price: 24.99,
            inventory: 40,
            sku: 'TSHIRT-001-BLK-M',
            options: {
              color: 'Black',
              size: 'M',
            },
          },
        ],
      },
    },
  });

  const coffeemaker = await prisma.product.create({
    data: {
      name: 'Programmable Coffee Maker',
      description: 'Automatic coffee maker with timer and multiple settings',
      price: 89.99,
      comparePrice: 99.99,
      sku: 'COFFEE-001',
      inventory: 75,
      images: [
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=2073',
        'https://images.unsplash.com/photo-1502899684837-a70865ba277a?q=80&w=2073',
      ],
      slug: 'programmable-coffee-maker',
      categoryId: homeCategory.id,
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excellent smartphone! Fast and great camera.',
      userId: user.id,
      productId: smartphone.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Good laptop but battery life could be better.',
      userId: user.id,
      productId: laptop.id,
    },
  });

  // Add item to user's cart
  const userCart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (userCart) {
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: userCart.id,
        productId: smartphone.id,
        variantId: (await prisma.productVariant.findFirst({
          where: { productId: smartphone.id },
        }))?.id,
      },
    });
  }

  // Create an order
  const userAddress = await prisma.address.findFirst({ where: { userId: user.id } });
  if (userAddress) {
    const laptopVariant = await prisma.productVariant.findFirst({
      where: { sku: 'LAPTOP-001-I5-8-256' },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-10001',
        status: 'DELIVERED',
        total: 1599.98,
        subtotal: 1499.98,
        tax: 50.00,
        shipping: 50.00,
        userId: user.id,
        addressId: userAddress.id,
        items: {
          create: [
            {
              quantity: 1,
              price: 1499.99,
              name: 'Ultrabook Laptop',
              sku: 'LAPTOP-001-I5-8-256',
              productId: laptop.id,
              variantId: laptopVariant?.id,
            },
          ],
        },
        payment: {
          create: {
            amount: 1599.98,
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