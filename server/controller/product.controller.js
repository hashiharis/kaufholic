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

    // const { productImage } = req.file;
    // console.log("file", req.file);

    // console.log("Image details", req.file.filename);
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
      productImage: req.file.filename,
    });

    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
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

    const allProducts = await ProductModel.find({ sellerId })
      .populate("sellerId")
      .exec();

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

    if (products.length === 0) {
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

const editProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      title,
      subtitle,
      category,
      actualPrice,
      currentPrice,
      discountPercent,
      description,
      productImage,
    } = req.body;

    if (!isValidId(productId)) {
      return res
        .status(404)
        .json({ message: "Product with this id is not found" });
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        title,
        subtitle,
        category,
        actualPrice,
        currentPrice,
        discountPercent,
        description,
        productImage: req?.file?.filename,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ message: "Product not updated" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.log("Product details updation error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addRatingToProduct = async (req, res) => {
  try {
    const { rating, reviewMessage, buyerName } = req.body;

    // console.log("body", rating, reviewMessage, buyerName);
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
            "review.$.buyerName": buyerName || null,
            "review.$.reviewMessage": reviewMessage || null,
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
              buyerName: buyerName || null,
              reviewMessage: reviewMessage || null,
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

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidId(productId)) {
      return res.status(400).json({ message: "Product Id is not valid" });
    }

    const review = await ProductModel.findById(productId);

    if (review.review.length === 0) {
      return res.status(404).json({ message: "Review empty" });
    }

    return res
      .status(200)
      .json({ message: "Review fetched successfully", data: review.review });
  } catch (error) {
    console.log("Error on fetching reviews", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
const sortByPriceAscending = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ currentPrice: 1 });

    if (!products) {
      return res.status(400).json({ message: "Products not fetched" });
    }

    return res.status(200).json({
      message: "Products sorted from low to high",
      priceSortLowToHigh: products,
    });
  } catch (error) {
    console.log("Error on sorting low to high", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const sortByPriceDescending = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ currentPrice: -1 });

    if (!products) {
      return res.status(400).json({ message: "Products not fetched" });
    }

    return res.status(200).json({
      message: "Product sorted from high to low",
      priceSortHighToLow: products,
    });
  } catch (error) {
    console.log("Error on sorting high to low", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const sortByRatingsDescending = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ avgRating: -1 });

    if (products.length === 0) {
      return res.status(400).json({ message: "Products not fetched" });
    }

    return res.status(200).json({
      message: "Sorted on ratings high to low",
      sortedByRating: products,
    });
  } catch (error) {
    console.log("Error on sorting by rating", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const filterByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const productByCategory = await ProductModel.find({ category });

    if (!productByCategory) {
      return res
        .status(404)
        .json({ message: "There are no products within this category" });
    }

    return res.status(200).json({
      message: "Products in the specified category",
      category: productByCategory,
    });
  } catch (error) {
    console.log("Error on filtering by category", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const searchTerm = new RegExp(query, "i"); // i ignore case
    // console.log(searchTerm);
    const results = await ProductModel.find({
      title: searchTerm,
      // { $regex: new RegExp("^" + searchTerm.toLowerCase(), "i") }
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "No results found!!" });
    }

    return res.status(200).json({ message: "Search result", results: results });
  } catch (error) {
    console.log("Error on product search", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const priceRangeFilter = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    const productsInRange = await ProductModel.find({
      currentPrice: { $gte: minPrice, $lte: maxPrice },
    });

    if (productsInRange.length === 0) {
      return res
        .status(404)
        .json({ message: "No Products available in this price range" });
    }

    return res.status(200).json({
      message: "Products in the range",
      productsByPriceRange: productsInRange,
    });
  } catch (error) {
    console.log("Error on product filtering by price range", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  addProduct,
  fetchProductsBySeller,
  getProducts,
  getProductById,
  editProductDetails,
  addRatingToProduct,
  getReviews,
  sortByPriceAscending,
  sortByPriceDescending,
  sortByRatingsDescending,
  filterByCategory,
  searchProduct,
  priceRangeFilter,
};
