const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Creating a Single User
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword", // Always hash passwords in production
    },
  });

  // Creating Categories
  const categories = await prisma.category.createMany({
    data: [
      { categoryName: "Electronics", imgUrl: "https://via.placeholder.com/150", status: true, sequence: 1, userId: user.id },
      { categoryName: "Clothing", imgUrl: "https://via.placeholder.com/150", status: true, sequence: 2, userId: user.id },
      { categoryName: "Home Appliances", imgUrl: "https://via.placeholder.com/150", status: true, sequence: 3, userId: user.id },
      { categoryName: "Books", imgUrl: "https://via.placeholder.com/150", status: true, sequence: 4, userId: user.id },
    ],
  });

  const categoryList = await prisma.category.findMany(); // Fetch inserted categories

  // Creating Subcategories
  const subcategories = await prisma.subcategory.createMany({
    data: [
      { subcategoryName: "Mobile Phones", categoryId: categoryList[0].id, imgUrl: "https://via.placeholder.com/150", status: true, sequence: 1, userId: user.id },
      { subcategoryName: "Laptops", categoryId: categoryList[0].id, imgUrl: "https://via.placeholder.com/150", status: true, sequence: 2, userId: user.id },
      { subcategoryName: "Men's Fashion", categoryId: categoryList[1].id, imgUrl: "https://via.placeholder.com/150", status: true, sequence: 3, userId: user.id },
      { subcategoryName: "Women's Fashion", categoryId: categoryList[1].id, imgUrl: "https://via.placeholder.com/150", status: true, sequence: 4, userId: user.id },
    ],
  });

  const subcategoryList = await prisma.subcategory.findMany(); // Fetch inserted subcategories

  // Creating Products
  await prisma.product.createMany({
    data: [
      { productName: "iPhone 14", subcategoryId: subcategoryList[0].id, categoryId: categoryList[0].id, status: true, userId: user.id },
      { productName: "Samsung Galaxy S23", subcategoryId: subcategoryList[0].id, categoryId: categoryList[0].id, status: true, userId: user.id },
      { productName: "MacBook Pro", subcategoryId: subcategoryList[1].id, categoryId: categoryList[0].id, status: true, userId: user.id },
      { productName: "Dell XPS 15", subcategoryId: subcategoryList[1].id, categoryId: categoryList[0].id, status: true, userId: user.id },
      { productName: "Men's Jacket", subcategoryId: subcategoryList[2].id, categoryId: categoryList[1].id, status: true, userId: user.id },
      { productName: "Men's Sneakers", subcategoryId: subcategoryList[2].id, categoryId: categoryList[1].id, status: true, userId: user.id },
      { productName: "Women's Dress", subcategoryId: subcategoryList[3].id, categoryId: categoryList[1].id, status: true, userId: user.id },
      { productName: "Women's Handbag", subcategoryId: subcategoryList[3].id, categoryId: categoryList[1].id, status: true, userId: user.id },
      { productName: "Air Fryer", subcategoryId: subcategoryList[0].id, categoryId: categoryList[2].id, status: true, userId: user.id },
      { productName: "Microwave Oven", subcategoryId: subcategoryList[0].id, categoryId: categoryList[2].id, status: true, userId: user.id },
      { productName: "Fiction Book", subcategoryId: subcategoryList[1].id, categoryId: categoryList[3].id, status: true, userId: user.id },
      { productName: "Self-Help Book", subcategoryId: subcategoryList[1].id, categoryId: categoryList[3].id, status: true, userId: user.id },
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
