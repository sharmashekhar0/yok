/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';
import InsertDriveFileSharpIcon from '@mui/icons-material/InsertDriveFileSharp';

import Iconify from 'src/components/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './orderView.css';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { getAllOrders } from 'src/api/api';
import Invoice from './Invoice';
import { moveToShiprocket, deleteOrder } from 'src/api/api';

export default function OrderView() {
  const [activeButton, setActiveButton] = useState('product');
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [pageToOpen, setPageToOpen] = useState('orders');

  const [value, setValue] = React.useState(null);

  const [clickedFiltedProduct, setClickedFiltedProduct] = useState(null);

  const handleNewProductButtonClick = () => {
    console.log('cli');
    setActiveButton('newProduct');
    // navigate('/product/add-product')
  };

  function formatDate(isoDateStr) {
    // Create a new Date object from the ISO 8601 date string
    const date = new Date(isoDateStr);

    // Get the year, month, day, hours, and minutes
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date as 'YYYY-MM-DD HH:MM'
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleMoveToShiprocket = async (order) => {
    try {
      const date = formatDate(order?.createdAt);
      console.log(order);
      const data = {
        order_id: order?._id,
        order_date: date,
        pickup_location: '',
        channel_id: '',
        comment: '',
        reseller_name: '',
        company_name: '',
        billing_customer_name: order?.shippingAddress?.firstName,
        billing_last_name: order?.shippingAddress?.lastName,
        billing_address: order?.shippingAddress?.address,
        billing_address_2: '',
        billing_isd_code: '',
        billing_city: order?.shippingAddress?.city,
        billing_pincode: order?.shippingAddress?.pincode,
        billing_state: order?.shippingAddress?.state,
        billing_country: '',
        billing_email: order?.shippingAddress?.email,
        billing_phone: order?.shippingAddress?.phone,
        billing_alternate_phone: '',
        shipping_is_billing: true,
        shipping_customer_name: order?.firstName,
        shipping_last_name: order?.lastName,
        shipping_address: order?.address,
        shipping_address_2: '',
        shipping_city: order?.city,
        shipping_pincode: order?.pincode,
        shipping_country: '',
        shipping_state: '',
        shipping_email: order?.email,
        shipping_phone: order?.phone,
        order_items: order?.products,
        payment_method: order?.paymentMethod,
        shipping_charges: '',
        giftwrap_charges: '',
        transaction_charges: '',
        total_discount: '',
        sub_total: order?.totalPrice,
        length: '',
        breadth: '',
        height: '',
        weight: '',
        ewaybill_no: '',
        customer_gstin: '',
        invoice_number: '',
        order_type: '',
      };
      console.log(data);
      const response = await moveToShiprocket(data);
      console.log(response);
    } catch (error) {
      console.log('Error while moving to shiprocket :: ', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();
      console.log(data);
      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleView = (productId) => {
    console.log(`View product with ID: ${productId}`);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
    console.log('Sort Option:', event.target.value);
  };

  let filteredOrders = orders
    .filter((order) => {
      const searchTermLower = searchTerm.toLowerCase();
      const { shippingAddress, status } = order;
      const addressValues = Object.values(shippingAddress).join(' ').toLowerCase();
      return (
        addressValues.includes(searchTermLower) || status.toLowerCase().includes(searchTermLower)
      );
    })
    .filter((order) => {
      if (sortOption) {
        return order.status.toLowerCase() === sortOption.toLowerCase();
      }
      return true;
    });

  console.log('sortOption', filteredOrders);
  const totalPages = Math.ceil(orders?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredProducts = orders
    ?.filter((product) => {
      const searchTermLower = searchTerm.toLowerCase();
      return Object.values(product).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
      );
    })
    .filter((product) => {
      if (sortOption === 'Processing') {
        return product.status === 'Processing';
      } else if (sortOption === 'Shipped') {
        return product.status === 'Shipped';
      } else if (sortOption === 'Delivered') {
        return product.status === 'Delivered';
      } else if (sortOption === 'Pending') {
        return product.status === 'Pending';
      }
      return true;
    })
    .slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (orderId) => {
    console.log(`Delete product with ID: ${orderId}`);
    try {
      const response = await deleteOrder(orderId);
      console.log(response);
      if (response?.message === 'Order deleted successfully') {
        filteredOrders = filteredOrders?.filter((order) => order._id !== orderId);
      }
    } catch (error) {
      console.log('Error while deleting order :: ', error);
    }
  };

  const hanleInvoiceClick = (productId) => {
    setPageToOpen('invoice');
    const filtedItem = filteredOrders.filter((o) => o._id === productId);
    setClickedFiltedProduct(filtedItem[0]);
  };

  console.log('sortOption', sortOption);
  return (
    <Container>
      {pageToOpen === 'orders' && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Orders</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2} // Add some gap between the components
            mb={1}
          >
            {/* Search TextField */}
            <Box
              sx={{
                width: '100%', // Set width to 50%
              }}
            >
              <TextField
                fullWidth
                label="Search"
                id="fullWidth"
                value={searchTerm}
                onChange={handleSearch}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       {/* Add your search icon here */}
                //       <SearchIcon />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </Box>

            {/* Sort By Dropdown */}
          </Stack>

          <div className="d-flex justify-content-between gap-4">
            <div className="d-flex w-50 gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{ width: '50%' }} components={['DatePicker']}>
                  <DatePicker
                    label="From"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{ width: '50%' }} components={['DatePicker']}>
                  <DatePicker
                    label="To"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <FormControl variant="outlined" sx={{ width: '50%', minWidth: 120, marginTop: '8px' }}>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by"
                label="Sort By"
                value={sortOption}
                onChange={handleSort}
              >
                {/* Dummy Options */}
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Refunded">Refunded</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Shiprocket</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((orders) => (
                    <tr key={orders._id}>
                      <td>{orders._id}</td>
                      <td>{orders.user}</td>
                      <td>{orders.createdAt}</td>
                      <td>{orders.products.length}</td>
                      <td>{orders.totalPrice}</td>
                      <td>{orders.status}</td>
                      <td>
                        <IconButton onClick={() => handleView(orders._id)} title="View">
                          <VisibilityIcon className="aquablue" />
                        </IconButton>
                        <IconButton onClick={() => hanleInvoiceClick(orders._id)} title="Invoice">
                          <InsertDriveFileSharpIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(orders?._id)} title="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </td>
                      <td>
                        <IconButton
                          onClick={() => handleMoveToShiprocket(orders)}
                          title="Move To Shiprocket"
                        >
                          <span
                            style={{
                              color: 'white',
                              backgroundColor: '#1e90ff',
                              borderRadius: '5px',
                              padding: '2px 4px',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                            }}
                          >
                            Move
                          </span>
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4">
              <Stack alignItems={'end'}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          )}
        </div>
      )}
      {pageToOpen === 'invoice' && <Invoice clickedFiltedProduct={clickedFiltedProduct} />}
    </Container>
  );
}
