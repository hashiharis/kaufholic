const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const buyerRouter = require("./routes/buyer.routes");
const connectDb = require("./connectDB");
const sellerRouter = require("./routes/seller.routes");
const productRouter = require("./routes/product.routes");
const wishlistRouter = require("./routes/wishlist.routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home route");
});

app.use("/buyer", buyerRouter);
app.use("/seller", sellerRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);

connectDb();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
