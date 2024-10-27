/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./selleraddproduct.module.css";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const SellerAddProduct = ({ changeActivePage }) => {
  const [validated, setValidated] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    subtitle: "",
    category: "",
    actualPrice: "",
    discountPercent: "",
    description: "",
    sellerId: localStorage.getItem("kh-sellerId"),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validationProductFields()) {
      addProductDataToServer();
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const validationProductFields = () => {
    const {
      title,
      subtitle,
      category,
      actualPrice,
      discountPercent,
      description,
    } = productData;

    if (
      !title ||
      !subtitle ||
      !category ||
      !actualPrice ||
      !discountPercent ||
      !description
    ) {
      alert("Please fill the required fields");
      return false;
    }
    return true;
  };
  const addProductDataToServer = async () => {
    try {
      const res = await axiosInstance.post("/product/addProduct", productData);
      console.log("Response", res);
      if (res.status === 201) {
        toast.success("Product added successfully");
        changeActivePage("My Products");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding product", error);
    }
  };
  return (
    <div className={styles.productDetailsWrapper}>
      <div className={styles.addPrdtImg}></div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.addProductForm}
      >
        <h1>Add Your Product</h1>
        <Form.Group controlId="validationCustom01" className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Product name"
            name="title"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a title for the product
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom01" className="mb-3">
          <Form.Label>Product Subtitle</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Product sub title"
            name="subtitle"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a subtitle for the product
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            name="category"
            onChange={handleChange}
          >
            <option value="">Open this select menu</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Accessories">Accessories</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a category
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03" className="mb-3">
          <Form.Label>Actual Price</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Price"
              required
              name="actualPrice"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter price
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="validationCustom04" className="mb-3">
          <Form.Label>Discount Percentage</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Discount"
              required
              name="discountPercent"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a value
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="validationCustom05" className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Details"
            required
            name="description"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter product details
          </Form.Control.Feedback>
        </Form.Group>
        <div className={styles.addProductBtn}>
          <Button type="submit">Add Product</Button>
        </div>
      </Form>
    </div>
  );
};
