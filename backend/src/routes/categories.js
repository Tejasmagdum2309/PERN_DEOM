const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
/* ---------------- CATEGORY ROUTES ---------------- */

// Get all categories with pagination
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.userId);

    // Get `page` and `limit` from query params (default: page 1, limit 5)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Fetch paginated categories for logged-in user
    const categories = await prisma.category.findMany({
      where: { userId: req.userId },
      select: { id: true, categoryName: true, imgUrl: true, status: true, sequence: true },
      skip,
      take: limit,
    });

    // Get total category count for pagination
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

// Create a new category
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { categoryName, imgUrl, status, sequence } = req.body;

    const category = await prisma.category.create({
      data: {
        userId: req.userId,
        categoryName,
        imgUrl,
        status,
        sequence: parseInt(sequence),
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a category
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { categoryName, sequence } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { categoryName, sequence: Number(sequence) },
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Delete a category
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await prisma.category.delete({ where: { id } });
    res.json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
