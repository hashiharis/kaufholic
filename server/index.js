const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const buyerRouter = require("./routes/buyer.routes");
const connectDb = require("./connectDB");
const sellerRouter = require("./routes/seller.routes");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home route");
});

app.use("/buyer", buyerRouter);
app.use("/seller", sellerRouter);

connectDb();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
