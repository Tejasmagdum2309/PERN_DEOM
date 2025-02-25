const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js"); // Ensure this middleware is available
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Create a new subcategory
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { subcategoryName, imgUrl, status, sequence, categoryId } = req.body;

    if (!subcategoryName || !categoryId || sequence === undefined) {
      return res.status(400).json({ error: "subcategoryName, categoryId, and sequence are required" });
    }

    const subcategory = await prisma.subcategory.create({
      data: {
        userId: req.userId, // Ensure req.userId is set in authMiddleware
        subcategoryName,
        imgUrl: imgUrl || "", // Provide a default empty string if imgUrl is missing
        status: status ?? true, // Default to true if status is missing
        sequence: Number(sequence),
        categoryId,
      },
    });
    res.status(201).json(subcategory);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all subcategories with category names
router.get("/", async (req, res) => {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: { Category: true },
    });
    res.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

// Get a single subcategory by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: { Category: true },
    });
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({ error: "Failed to fetch subcategory" });
  }
});

// Update a subcategory
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { subcategoryName, sequence } = req.body;

  try {
    const updatedSubcategory = await prisma.subcategory.update({
      where: { id },
      data: { subcategoryName, sequence: Number(sequence) },
    });
    res.json(updatedSubcategory);
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ error: "Failed to update subcategory" });
  }
});

// Delete a subcategory
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    // First, delete associated products
    await prisma.product.deleteMany({
      where: { subcategoryId: id },
    });

    // Now delete the subcategory
    await prisma.subcategory.delete({
      where: { id },
    });

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
});

module.exports = router;
