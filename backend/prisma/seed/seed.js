const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Creating Users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword1", // Hash password in real applications
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashedpassword2",
    },
  });

  // Creating Categories
  const category1 = await prisma.category.create({
    data: {
      categoryName: "Electronics",
      imgUrl: "https://via.placeholder.com/150",
      status: true,
      sequence: 1,
      userId: user1.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      categoryName: "Clothing",
      imgUrl: "https://via.placeholder.com/150",
      status: true,
      sequence: 2,
      userId: user2.id,
    },
  });

  // Creating Subcategories
  const subcategory1 = await prisma.subcategory.create({
    data: {
      subcategoryName: "Mobile Phones",
      categoryId: category1.id,
      imgUrl: "https://via.placeholder.com/150",
      status: true,
      sequence: 1,
      userId: user1.id,
    },
  });

  const subcategory2 = await prisma.subcategory.create({
    data: {
      subcategoryName: "Men's Fashion",
      categoryId: category2.id,
      imgUrl: "https://via.placeholder.com/150",
      status: true,
      sequence: 2,
      userId: user2.id,
    },
  });

  // Creating Products
  await prisma.product.createMany({
    data: [
      {
        productName: "iPhone 14",
        subcategoryId: subcategory1.id,
        categoryId: category1.id,
        status: true,
        userId: user1.id,
      },
      {
        productName: "Samsung Galaxy S23",
        subcategoryId: subcategory1.id,
        categoryId: category1.id,
        status: true,
        userId: user1.id,
      },
      {
        productName: "Men's Jacket",
        subcategoryId: subcategory2.id,
        categoryId: category2.id,
        status: true,
        userId: user2.id,
      },
      {
        productName: "Men's Sneakers",
        subcategoryId: subcategory2.id,
        categoryId: category2.id,
        status: true,
        userId: user2.id,
      },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
