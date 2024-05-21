import React from 'react';

const Invoice = () => {
  // Dummy invoice data
  const invoiceData = {
    invoiceNumber: 'INV-001',
    invoiceDate: '2022-02-20',
    dueDate: '2022-03-05',
    from: {
      name: 'Your Company Name',
      address: '456 Business St, Cityville',
      email: 'info@yourcompany.com',
    },
    to: {
      name: 'John Doe',
      address: '123 Main St, Cityville',
      email: 'john@example.com',
    },
    items: [
      { id: 1, description: 'Product A', quantity: 2, price: 20 },
      { id: 2, description: 'Product B', quantity: 1, price: 25 },
      // Add more items as needed
    ],
    total: 0, // This will be calculated based on item prices and quantities
  };

  // Calculate the total
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
          <p>{invoiceData.from.name}</p>
          <p>{invoiceData.from.address}</p>
          <p>Email: {invoiceData.from.email}</p>
        </div>
        <div className="invoice-section">
          <h3>Invoice To</h3>
          <p>{invoiceData.to.name}</p>
          <p>{invoiceData.to.address}</p>
          <p>Email: {invoiceData.to.email}</p>
        </div>
        <div className="invoice-section">
          <h3>Invoice Details</h3>
          <p>Invoice Number: {invoiceData.invoiceNumber}</p>
          <p>Invoice Date: {invoiceData.invoiceDate}</p>
          <p>Due Date: {invoiceData.dueDate}</p>
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
        <p>Total: ${invoiceData.total}</p>
      </div>
    </div>
  );
};

export default Invoice;
