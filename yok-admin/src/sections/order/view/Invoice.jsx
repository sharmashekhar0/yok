/* eslint-disable */
import React from "react";

const Invoice = ({ clickedFiltedProduct }) => {
  console.log("clickedFiltedProduct in invoice", clickedFiltedProduct);
  const invoiceData = {
    invoiceDate: clickedFiltedProduct.createdAt,
    from: {
      name: "Your Company Name",
      address: "456 Business St, Cityville",
      email: "info@yourcompany.com",
    },
    to: {
      name: `${clickedFiltedProduct.shippingAddress.firstName} ${clickedFiltedProduct.shippingAddress?.lastName}`,
      email: clickedFiltedProduct.shippingAddress.email,
      address: `${clickedFiltedProduct.shippingAddress.address}, ${clickedFiltedProduct.shippingAddress.city}`,
      phone: `${clickedFiltedProduct.shippingAddress.phone}`,
    },
    items: clickedFiltedProduct.products,
    total: 0,
  };

  invoiceData.total = invoiceData.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="invoice-container">
      <h2>Invoice</h2>
      <div className="invoice-details">
        <div className="invoice-section">
          <h3>Invoice From</h3>
          <p>YOK International</p>
          <p>yokinternational@gmail.com</p>
        </div>
        <div className="invoice-section">
          <h3>Invoice To</h3>
          <p>Name: {invoiceData.to.name}</p>
          <p>Email: {invoiceData.to.email}</p>
          <p>Phone: {invoiceData.to.phone}</p>
          <p>Address: {invoiceData.to.address}</p>
        </div>
        <div className="invoice-section">
          <h3>Invoice Details</h3>
          <p>Invoice Date: {invoiceData.invoiceDate}</p>
        </div>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-total">
        <p>Total: ${clickedFiltedProduct.totalPrice}</p>
      </div>
    </div>
  );
};

export default Invoice;
