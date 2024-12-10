const { format } = require("date-fns");
const validateDeliveryDate = (req, res, next) => {
  try {
    const { deliveryDate } = req.query;

    if (!deliveryDate) {
      return res
        .status(404)
        .json({ message: "Delivery date is not found or empty" });
    }

    const currentDate = format(new Date(), "yyyy-MM-dd");

    if (deliveryDate <= currentDate) {
      return res
        .status(400)
        .json({ message: "Please select a future date for delivery" });
    }

    next();
  } catch (error) {
    console.log("Error in delivery date validation", error);
    return res
      .status(500)
      .json({ message: "Error in delivery date validation" });
  }
};

module.exports = { validateDeliveryDate };
