/* eslint-disable */
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { getAllOrders } from "src/api/api";
import Invoice from "./Invoice";

export default function OrderView() {
  const [activeButton, setActiveButton] = useState("product");
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [pageToOpen, setPageToOpen] = useState("orders")

  const [value, setValue] = React.useState(null);

  const [clickedFiltedProduct, setClickedFiltedProduct] = useState(null)

  const handleNewProductButtonClick = () => {
    console.log('cli');
    setActiveButton('newProduct');
    // navigate('/product/add-product')
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();
      console.log(data)
      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  const handleView = (productId) => {
    console.log(`View product with ID: ${productId}`);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product with ID: ${productId}`);
  };
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
    console.log('Sort Option:', event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const searchTermLower = searchTerm.toLowerCase();
    const { shippingAddress, status } = order;
    const addressValues = Object.values(shippingAddress).join(" ").toLowerCase();
    return (
      addressValues.includes(searchTermLower) ||
      status.toLowerCase().includes(searchTermLower)
    );
  }).filter((order) => {
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

  const hanleInvoiceClick = (productId) => {
    setPageToOpen("invoice")
    const filtedItem = filteredOrders.filter((o) => o._id === productId)
    setClickedFiltedProduct(filtedItem[0])
  }

  console.log('sortOption', sortOption);
  return (
    <Container>
      {pageToOpen === "orders" && <div>
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
                <DatePicker label="To" value={value} onChange={(newValue) => setValue(newValue)} />
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
                      <IconButton
                        onClick={() => hanleInvoiceClick(orders._id)}
                        title="Invoice"
                      >
                        <InsertDriveFileSharpIcon />
                      </IconButton>
                      {/* <IconButton
                        onClick={() => handleDelete(product.id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No products found</td>
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
      </div>}
      {pageToOpen === "invoice" && <Invoice clickedFiltedProduct={clickedFiltedProduct}/>}
    </Container>
  );
}
