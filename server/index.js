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
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
const authRouter = require("./routes/auth.routes");
const adminRouter = require("./routes/admin.routes");
const complaintRouter = require("./routes/complaint.routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/upload`));

app.get("/", (req, res) => {
  res.send("home route");
});

app.use("/buyer", buyerRouter);
app.use("/seller", sellerRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/complaints", complaintRouter);

connectDb();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
