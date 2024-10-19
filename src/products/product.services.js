//Service layer bertujuan untuk handle business logic

const prisma = require("../db");
const {
  findProduct,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProduct();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProducts = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) {
    throw Error("Product already exists");
  }

  const product = await insertProduct(newProductData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProducts,
  deleteProductById,
  editProductById,
};
