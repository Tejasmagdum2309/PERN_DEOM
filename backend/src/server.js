const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware.js');
const cookieParser = require('cookie-parser');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());




// user routes
app.use("/api/auth", authRoutes);



/* ---------------- CATEGORY ROUTES ---------------- */
// Get all categories
app.get("/categories", authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.userId);

    // Get `page` and `limit` from query params (default: page 1, limit 5)
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default limit = 5
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    // Fetch paginated categories
    const categories = await prisma.category.findMany({
      where: { userId: req.userId }, // Fetch categories for logged-in user
      select: {
        id: true,
        categoryName: true,
        imgUrl: true,
        status: true,
        sequence: true,
      },
      skip: skip,
      take: limit,
    });

    // Get total count of categories (for pagination info)
    const totalCategories = await prisma.category.count({
      where: { userId: req.userId },
    });

    res.json({
      categories,
      totalCategories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// add categorie 

app.post("/categories", authMiddleware, async (req, res) => {
  try {
    const { categoryName, imgUrl, status, sequence } = req.body;
    const category = await prisma.category.create({
      data: {
        userId: req.userId,
        categoryName,
        imgUrl,
        status,
        sequence,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // Create category
// app.post('/categories', async (req, res) => {
//   const { name, imgUrl, status, sequence } = req.body;
//   const category = await prisma.category.create({
//     data: { name, imgUrl, status, sequence },
//   });
//   res.json(category);
// });

// // Update category
// app.put('/categories/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, imgUrl, status, sequence } = req.body;
//   const category = await prisma.category.update({
//     where: { id: parseInt(id) },
//     data: { name, imgUrl, status, sequence },
//   });
//   res.json(category);
// });

// // Delete category
// app.delete('/categories/:id', async (req, res) => {
//   const { id } = req.params;
//   await prisma.category.delete({ where: { id: parseInt(id) } });
//   res.json({ message: 'Category deleted' });
// });

// /* ---------------- SUBCATEGORY ROUTES ---------------- */
// // Get all subcategories
// app.get('/subcategories', async (req, res) => {
//   const subcategories = await prisma.subcategory.findMany();
//   res.json(subcategories);
// });

// // Create subcategory
// app.post('/subcategories', async (req, res) => {
//   const { name, categoryId, imgUrl, status, sequence } = req.body;
//   const subcategory = await prisma.subcategory.create({
//     data: { name, categoryId, imgUrl, status, sequence },
//   });
//   res.json(subcategory);
// });

// // Update subcategory
// app.put('/subcategories/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, categoryId, imgUrl, status, sequence } = req.body;
//   const subcategory = await prisma.subcategory.update({
//     where: { id: parseInt(id) },
//     data: { name, categoryId, imgUrl, status, sequence },
//   });
//   res.json(subcategory);
// });

// // Delete subcategory
// app.delete('/subcategories/:id', async (req, res) => {
//   const { id } = req.params;
//   await prisma.subcategory.delete({ where: { id: parseInt(id) } });
//   res.json({ message: 'Subcategory deleted' });
// });

// /* ---------------- PRODUCT ROUTES ---------------- */
// // Get all products
// app.get('/products', async (req, res) => {
//   const products = await prisma.product.findMany();
//   res.json(products);
// });

// // Create product
// app.post('/products', async (req, res) => {
//   const { name, subcategoryId, categoryId, status } = req.body;
//   const product = await prisma.product.create({
//     data: { name, subcategoryId, categoryId, status },
//   });
//   res.json(product);
// });

// // Update product
// app.put('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, subcategoryId, categoryId, status } = req.body;
//   const product = await prisma.product.update({
//     where: { id: parseInt(id) },
//     data: { name, subcategoryId, categoryId, status },
//   });
//   res.json(product);
// });

// // Delete product
// app.delete('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   await prisma.product.delete({ where: { id: parseInt(id) } });
//   res.json({ message: 'Product deleted' });
// });

// app.get('/', async (req, res) => {
//   res.send('Hello World!');
// });

/* ---------------- START SERVER ---------------- */
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));