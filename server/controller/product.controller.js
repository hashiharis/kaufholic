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

    // const { productImage } = req.file.filename;

    console.log("Image details", productImage);
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
      productImage,
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
        .json({ message: "No products found for this seller" });
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

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidId(productId)) {
      return res
        .status(404)
        .json({ message: "Product with this id is not found" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product Not found" });
    }

    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    console.log("Error on fetching product by id", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const addRatingToProduct = async (req, res) => {
  try {
    const { rating } = req.body;
    const { productId, buyerId } = req.params;

    if (!isValidId(productId)) {
      return res.status(404).json({ message: "Product id is not valid" });
    }

    if (!isValidId(buyerId)) {
      return res.status(404).json({ message: "Buyer id is not valid" });
    }

    // Checking if the product has an existing review from the specific buyer
    const product = await ProductModel.findOne({
      _id: productId,
      "review.buyerId": buyerId, //filtering the review array by the buyerId
    });

    if (product) {
      // if review rating already exist for the specific buyer then update the rating
      await ProductModel.updateOne(
        { _id: productId, "review.buyerId": buyerId },
        {
          $set: {
            "review.$.rating": rating,
            "review.$.reviewMessage": null,
          },
        }
      );
    } else {
      // if review rating doesn't exist then creating a new entry in the review array for the buyer
      await ProductModel.updateOne(
        { _id: productId },
        {
          $push: {
            review: {
              buyerId: buyerId,
              rating: rating,
              reviewMessage: null,
            },
          },
        }
      );
    }

    // if (product.length === 0) {
    //   return res.status(404).json({
    //     message: "Cannot find product and buyer with specified id's",
    //   });
    // }

    return res
      .status(200)
      .json({ message: "Rating added successfully", data: product });
  } catch (error) {
    console.log("Error on adding rating", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addProduct,
  fetchProductsBySeller,
  getProducts,
  getProductById,
  addRatingToProduct,
};
