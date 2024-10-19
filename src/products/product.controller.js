// Layer untuk handle request dan response
// & handle validasi body
const express = require("express");
const router = express.Router();
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  createProducts,
  deleteProductById,
  editProductById,
} = require("./product.services");
const { parse } = require("dotenv");

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(parseInt(productId));

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProducts(newProductData);

    res.status(201).send({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProductById(parseInt(productId));
    res.send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.image &&
      productData.description &&
      productData.name &&
      productData.price
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  const product = await editProductById(parseInt(productId), productData);

  res.send({
    data: product,
    message: "Product updated successfully",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.send({
      data: product,
      message: "Product single updated successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
