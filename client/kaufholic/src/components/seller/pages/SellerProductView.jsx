import Card from "react-bootstrap/Card";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const SellerProductView = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const sellerId = localStorage.getItem("kh-sellerId");

  const fetchAllProducts = async () => {
    try {
      const res = await axiosInstance.get(`product/fetchProduct/${sellerId}`);
      console.log("product data", res);
      if (res.status === 200) {
        toast.success("data fetched");
        setProducts(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching product", error);
    }
  };
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      {products?.map((item, index) => (
        <Card key={index} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {item.category}
            </Card.Subtitle>
            <Card.Text>{item.price}</Card.Text>
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
