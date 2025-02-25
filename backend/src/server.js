const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware.js');
const cookieParser = require('cookie-parser');
const subcategoriesRouter = require("./routes/subCategoriesRoute.js");
const categoriesRouter = require("./routes/categories.js");


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


app.use("/categories", categoriesRouter);


//  asdadasdssssssssssssssssssssssssssssssssssssssssss

app.use("/subcategories", subcategoriesRouter);

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