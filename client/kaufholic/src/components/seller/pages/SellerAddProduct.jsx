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
    specification: "",
    care: "",
    sellerId: localStorage.getItem("kh-sellerId"),
  });
  const [prodImg, setProdImg] = useState("");

  const {
    title,
    subtitle,
    category,
    actualPrice,
    discountPercent,
    description,
    specification,
    care,
    sellerId,
  } = productData;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("subtitle", subtitle);
  formData.append("category", category);
  formData.append("actualPrice", actualPrice);
  formData.append("discountPercent", discountPercent);
  formData.append("description", description);
  formData.append("specification", specification);
  formData.append("care", care);
  formData.append("sellerId", sellerId);
  formData.append("productImage", prodImg);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validationProductFields()) {
      addProductDataToServer(formData);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });

    if (e.target.files) {
      const imgFile = e.target.files[0];
      setProdImg(imgFile);
    }
  };

  const validationProductFields = () => {
    const {
      title,
      subtitle,
      category,
      actualPrice,
      discountPercent,
      description,
      specification,
      care,
    } = productData;

    if (
      !title ||
      !subtitle ||
      !category ||
      !actualPrice ||
      !discountPercent ||
      !description ||
      !specification ||
      !care
    ) {
      alert("Please fill the required fields");
      return false;
    } else if (!prodImg) {
      alert("Please upload a product image");
      return false;
    }
    return true;
  };
  const addProductDataToServer = async (formData) => {
    try {
      const res = await axiosInstance.post("/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        <Form.Group controlId="validationCustom06" className="mb-3">
          <Form.Label>Product Specifications</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Product Specifications"
            required
            name="specification"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter product specifications
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom06" className="mb-3">
          <Form.Label>Care Instructions</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Care Instructions"
            required
            name="care"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter care Instructions
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom06" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Product Image"
            required
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please upload an image
          </Form.Control.Feedback>
        </Form.Group>
        <div className={styles.addProductBtn}>
          <Button type="submit">Add Product</Button>
        </div>
      </Form>
    </div>
  );
};
