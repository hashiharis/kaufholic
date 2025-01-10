/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const Tables = ({ headers, data, activePage, fetchApi }) => {
  const handleActivate = (id) => {
    updateStatus(id, true);
  };

  const handleDeactivate = (id) => {
    updateStatus(id, false);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axiosInstance.patch(
        `/auth/updateAccountStatus/${id}?isActive=${status}`
      );
      // console.log("statusdeactivate", status);
      if (res.status === 200) {
        if (status) {
          toast.success("Account Status activated successfully");
        } else {
          toast.success("Account status deactivated successfully");
        }
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating account status");
    } finally {
      fetchApi();
    }
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {activePage === "Buyers" &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        {activePage === "Products" &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.subtitle}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        {activePage === "Orders" &&
          data.map((order, index) => {
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>
                  {order.fName}
                  {order.lName}
                </td>
                <td>{productDetails}</td>
                <td>{order.totalPrice}</td>
              </tr>
            );
          })}
        {activePage === "Complaints" &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.complaint}</td>
            </tr>
          ))}
        {activePage === "Take Actions" &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              {item.description && <td>{item.description}</td>}
              {item.isActive ? (
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeactivate(item._id);
                    }}
                  >
                    Deactivate
                  </Button>
                </td>
              ) : (
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      handleActivate(item._id);
                    }}
                  >
                    Activate
                  </Button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
