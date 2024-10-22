const isValidId = require("../utils/validId");

const ProductModel = require("../model/product.model");

const addProduct = async (req, res) => {
  try {
    const { name, category, price, description, sellerId } = req.body;

    if (!isValidId(sellerId)) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const newProduct = new ProductModel({
      name,
      category,
      price,
      description,
      sellerId,
    });
    await newProduct.save();

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log("Error on seller adding product", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const fetchProductsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!isValidId(sellerId)) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const allProducts = await ProductModel.find().populate("sellerId").exec();

    if (allProducts.length === 0) {
      return res
        .status(404)
        .send({ message: "No products found for this seller" });
    }
    return res.status(200).json({
      message: "All products under this seller found",
      data: allProducts,
    });
  } catch (error) {
    console.log("Error on fetching product by seller id", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addProduct, fetchProductsBySeller };
