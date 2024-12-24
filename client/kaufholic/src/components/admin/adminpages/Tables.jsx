/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
export const Tables = ({ headers, data, activePage }) => {
  console.log("activepage", activePage);
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
        {activePage === "Take Actions" &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.complaint}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
