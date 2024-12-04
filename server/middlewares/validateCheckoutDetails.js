const validateOrderPrice = (req, res, next) => {
  const { price, totalPrice } = req.body;

  if (price <= 0 && totalPrice <= 0) {
    return res
      .status(400)
      .json({ message: "Price must be non negative and not zero" });
  }
  next();
};

const validateCustomerDetails = (req, res, next) => {
  const { email, fName, lName, stateRegion, address, contact } = req.body;

  if (!email || !fName || !lName || !stateRegion || !address || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

const validateAddress = (req, res, next) => {
  const { address } = req.body;

  if (address.length < 12) {
    return res
      .status(400)
      .json({ message: "Address must be 12 character long" });
  }
  next();
};

const validatePaymentEmptyFields = (req, res, next) => {
  const { cardHName, cardNo, expiryDate, cvv } = req.body;

  if (!cardHName || !cardNo || !expiryDate || !cvv) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

const validateCardNoLength = (req, res, next) => {
  const { cardNo } = req.body;

  if (cardNo.length < 16 || cardNo.length > 16) {
    return res
      .status(400)
      .json({ message: "Card number must be 16 characters" });
  }
  next();
};

const validateExpiryDate = (req, res, next) => {
  const { expiryDate } = req.body;

  const [year, month] = expiryDate.split("-").map(Number);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return res.status(400).json({ message: "Provided date is expired" });
  }

  next();
};

const validateCVVLength = (req, res, next) => {
  const { cvv } = req.body;

  if (cvv.length < 3 || cvv.length > 3) {
    return res.status(400).json({ message: "CVV must be 3 digits" });
  }
  next();
};

module.exports = {
  validateOrderPrice,
  validateCustomerDetails,
  validateAddress,
  validatePaymentEmptyFields,
  validateCardNoLength,
  validateExpiryDate,
  validateCVVLength,
};
