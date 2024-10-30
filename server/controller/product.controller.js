const isValidId = require("../utils/validId");

const ProductModel = require("../model/product.model");

const addProduct = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      category,
      actualPrice,
      discountPercent,
      description,
      sellerId,
    } = req.body;

    if (!isValidId(sellerId)) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const newProduct = new ProductModel({
      title,
      subtitle,
      category,
      actualPrice,
      discountPercent,
      currentPrice: req.currentPrice,
      discountPriceApplied: req.discountPriceApplied,
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

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    if (products.length === 0 || products.isSold) {
      return res.status(404).json({ message: "Products is not found" });
    }

    return res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.log("Error on fetching products", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateFavourite = async (req, res) => {
  try {
    const { productId, buyerId } = req.params;
    const { isLiked } = req.query;

    if (!isValidId(buyerId)) {
      return res.status(404).json({ message: "Not a valid buyer" });
    }

    const updatedProductsLiked = await ProductModel.findByIdAndUpdate(
      productId,
      { isLiked },
      {
        new: true,
      }
    );

    if (!updatedProductsLiked) {
      return res
        .status(404)
        .json({ message: "Product not found for updation" });
    }

    return res.status(200).json({
      message: "Products Favourite updated successfully",
      updatedLiked: updatedProductsLiked,
    });
  } catch (error) {
    console.log("Error on product favourite updation", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addProduct,
  fetchProductsBySeller,
  getProducts,
  updateFavourite,
};
