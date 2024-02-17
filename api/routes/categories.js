const router = require("express").Router();
const Category = require("../models/Category");

//CREATE CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
    return;
  } catch (error) {
    res.status(500).json(err);
    return;
  }
});

//GET CATEGORIES
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
    return;
  } catch (error) {
    res.status(500).json(err);
    return;
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
      try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category has been deleted...");
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
});

module.exports = router;
