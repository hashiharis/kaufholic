import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const TotalOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders/allOrders");
      if (res.status === 200) {
        setOrders(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching order details");
    }
  };

  console.log(orders);
  return (
    <div>
      <h4 style={{ marginBlock: "2em" }}>List of Orders</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Product Details</th>
            <th>Total Order Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const productDetails = order.orderedProducts
              .map(
                (product) =>
                  `Product Name:${product.productId.title}
                   (Category-${product.productId.category}) 
                   Qty:${product.quantity} 
                   Delivery Status:${product.deliveryStatus}`
              )
              .join(",");

            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{productDetails}</td>
                <td>{order.totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
