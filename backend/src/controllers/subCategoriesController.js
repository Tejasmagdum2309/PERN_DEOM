const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Get all subcategories with category names
router.get("/subcategories", async (req, res) => {
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
router.get("/subcategories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: { Category: true },
    });
    res.json(subcategory);
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({ error: "Failed to fetch subcategory" });
  }
});

// Update a subcategory
router.put("/subcategories/:id", async (req, res) => {
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
router.delete("/subcategories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.subcategory.delete({ where: { id } });
    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
});

module.exports = router;
