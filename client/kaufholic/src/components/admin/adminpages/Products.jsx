import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/viewall");
      if (res.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching product details");
    }
  };
  return (
    <div>
      <h4 style={{ marginBlock: "2em" }}>List of Products</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.subtitle}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
