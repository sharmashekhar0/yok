/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import './ReportsView.css';
import Pagination from '@mui/material/Pagination';
import { getAllOrders } from 'src/api/api';

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [orders, setOrders] = useState(null)

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const totalPages = Math.ceil(orders?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredSalesData = orders
    ?.filter((sale) => {
      const searchTermLower = searchTerm.toLowerCase();
      console.log(searchTermLower);
      return Object.values(sale).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'PriceHighToLow') {
        return a.price > b.price ? -1 : 1;
      } else if (sortOption === 'PriceLowToHigh') {
        return a.price < b.price ? -1 : 1;
      }
      return 0;
    })
    .slice(startIndex, endIndex);

  const handleView = (saleId) => {
    console.log(`View sale with ID: ${saleId}`);
  };

  const handleEdit = (saleId) => {
    console.log(`Edit sale with ID: ${saleId}`);
  };

  const handleDelete = (saleId) => {
    console.log(`Delete sale with ID: ${saleId}`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSalesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesData');
    XLSX.writeFile(workbook, 'sales_data.xlsx');
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  console.log('filteredSalesData', filteredSalesData);
  return (
    <Container>
      <Typography variant="h4" mb={3}>
        Sales Reports
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        {/* Search TextField */}
        <FormControl sx={{ width: '40%' }}>
          <InputLabel>Search</InputLabel>
          <Select value={searchTerm} onChange={handleSearch}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Men's Clothing">Men's Clothing</MenuItem>
            <MenuItem value="Women's Clothing">Women's Clothing</MenuItem>
          </Select>
        </FormControl>

        {/* Sort By Dropdown */}
        <FormControl sx={{ width: '40%' }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortOption} onChange={handleSort}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="PriceHighToLow">Price (High to Low)</MenuItem>
            <MenuItem value="PriceLowToHigh">Price (Low to High)</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={exportToExcel} variant="contained" color="inherit">
          Export to Excel
        </Button>
      </Stack>

      <TableContainer component={Paper} className="table-container">
        <Table className="review-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalesData?.map((sale, i) => (
              <TableRow key={sale.id}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{sale.user}</TableCell>
                <TableCell>{sale.status}</TableCell>
                <TableCell>{sale.totalPrice}</TableCell>
                <TableCell>{sale.products.length}</TableCell>
                <TableCell>{sale.paymentMethod}</TableCell>
                <TableCell>{sale.shippingAddress.city}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(sale.id)} title="View">
                    <VisibilityIcon className="aquablue" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(sale.id)} title="Edit">
                    <EditIcon className="green" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(sale.id)} title="Delete">
                    <DeleteIcon className="red" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Container>
  );
}
