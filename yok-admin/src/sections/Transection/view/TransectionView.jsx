/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Iconify from 'src/components/iconify';
import Pagination from '@mui/material/Pagination';
import {
  Box,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import './TransectionView.css';
import { getAllOrders } from 'src/api/api';

export default function RolesView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [orders, setOrders] = useState(null)
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
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleView = (reviewId) => {
    console.log(`View review with ID: ${reviewId}`);
  };

  const handleEdit = (reviewId) => {
    console.log(`Edit review with ID: ${reviewId}`);
  };

  const handleDelete = (reviewId) => {
    console.log(`Delete review with ID: ${reviewId}`);
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
  const filteredReviews = orders
    ?.filter((review) => {
      const searchTermLower = searchTerm.toLowerCase();
      return Object.values(review).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'RatingHighToLow') {
        return a.rating > b.rating ? -1 : 1;
      } else if (sortOption === 'RatingLowToHigh') {
        return a.rating < b.rating ? -1 : 1;
      } else if (sortOption === 'Published') {
        return a.published ? -1 : 1;
      }
      return 0;
    })
    .slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Transaction</Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          mb={5}
        >
          {/* Search TextField */}
          <Box
            sx={{
              width: '50%',
              '& .MuiFormControl-root': {
                width: '100%',
              },
            }}
          >
            <TextField
              fullWidth
              label="Search"
              id="fullWidth"
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              margin="dense"
            />
          </Box>

          {/* Sort By Dropdown */}
          <FormControl variant="outlined" sx={{ width: '50%', minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSort} label="Sort By">
              {/* Dummy Options */}
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              <MenuItem value="RatingHighToLow">
                Rating (High &gt; Low)
              </MenuItem>
              <MenuItem value="RatingLowToHigh">
                Rating (Low &gt; High)
              </MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <div className="table-container">
          <table className="review-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Payment</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews && filteredReviews.length > 0 ? (
                filteredReviews.map((review, i) => (
                  <tr key={review.id}>
                    <td>{i+1}</td>
                    <td>{review.user}</td>
                    <td>{review.paymentStatus}</td>
                    <td>{review.paymentMethod}</td>
                    <td>{review.totalPrice}</td>
                    <td>{review.shippingAddress.address}, {review.shippingAddress.city}</td>
                    <td>
                      <IconButton
                        onClick={() => handleView(review.id)}
                        title="View"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      {/* <IconButton
                        onClick={() => handleEdit(review.id)}
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(review.id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No reviews found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    </Container>
  );
}
