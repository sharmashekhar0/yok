/* eslint-disable */
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';

import Iconify from 'src/components/iconify';
import {
  Box,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import './InvoiceView.css';
import Invoice from './Invoice';

export default function InvoiceView() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dummyReviews = [
    {
      id: 1,
      product: 'Product A',
      rating: 4.5,
      customer: 'John Doe',
      comment: 'Great product!',
      published: true,
    },
    {
      id: 2,
      product: 'Product B',
      rating: 3.8,
      customer: 'Jane Doe',
      comment: 'Could be better.',
      published: true,
    },
    {
      id: 3,
      product: 'Product C',
      rating: 5.0,
      customer: 'Alice Smith',
      comment: 'Excellent!',
      published: false,
    },
    {
      id: 4,
      product: 'Product D',
      rating: 4.0,
      customer: 'Bob Johnson',
      comment: 'Good quality.',
      published: true,
    },
    {
      id: 5,
      product: 'Product E',
      rating: 2.5,
      customer: 'Emily Wilson',
      comment: 'Not satisfied.',
      published: true,
    },
    {
      id: 6,
      product: 'Product F',
      rating: 4.8,
      customer: 'Michael Brown',
      comment: 'Awesome!',
      published: true,
    },
    {
      id: 7,
      product: 'Product G',
      rating: 3.0,
      customer: 'Sarah Davis',
      comment: "It's okay.",
      published: false,
    },
    {
      id: 8,
      product: 'Product H',
      rating: 4.2,
      customer: 'Robert Smith',
      comment: 'Pretty good.',
      published: true,
    },
    {
      id: 9,
      product: 'Product I',
      rating: 5.0,
      customer: 'Emma Johnson',
      comment: 'Absolutely fantastic!',
      published: true,
    },
    {
      id: 10,
      product: 'Product J',
      rating: 2.0,
      customer: 'William Brown',
      comment: 'Not recommended.',
      published: true,
    },
    {
      id: 11,
      product: 'Product K',
      rating: 4.7,
      customer: 'Olivia Davis',
      comment: 'Highly recommended.',
      published: false,
    },
    {
      id: 12,
      product: 'Product L',
      rating: 3.5,
      customer: 'David Smith',
      comment: 'Average.',
      published: true,
    },
    {
      id: 13,
      product: 'Product M',
      rating: 4.9,
      customer: 'Sophia Johnson',
      comment: 'Fantastic!',
      published: true,
    },
    {
      id: 14,
      product: 'Product N',
      rating: 2.8,
      customer: 'Liam Brown',
      comment: 'Not worth the price.',
      published: true,
    },
    {
      id: 15,
      product: 'Product O',
      rating: 4.6,
      customer: 'Isabella Smith',
      comment: 'Great value for money.',
      published: false,
    },
    {
      id: 16,
      product: 'Product P',
      rating: 3.3,
      customer: 'Ethan Davis',
      comment: 'Could improve.',
      published: true,
    },
    {
      id: 17,
      product: 'Product Q',
      rating: 4.4,
      customer: 'Mia Johnson',
      comment: 'Very good.',
      published: true,
    },
    {
      id: 18,
      product: 'Product R',
      rating: 5.0,
      customer: 'Ava Brown',
      comment: 'Outstanding!',
      published: true,
    },
    {
      id: 19,
      product: 'Product S',
      rating: 3.7,
      customer: 'Lucas Smith',
      comment: 'Decent product.',
      published: true,
    },
    {
      id: 20,
      product: 'Product T',
      rating: 4.1,
      customer: 'Mason Davis',
      comment: 'Quite satisfied.',
      published: false,
    },
    {
      id: 21,
      product: 'Product U',
      rating: 2.2,
      customer: 'Ella Johnson',
      comment: 'Not good.',
      published: true,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleView = (reviewId) => {
    console.log(`View review with ID: ${reviewId}`);
    setShowInvoice(true);
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

  const totalPages = Math.ceil(dummyReviews?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredReviews = dummyReviews
    .filter((review) => {
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

  console.log('showInvoice', showInvoice);
  return (
    <Container>
      {!showInvoice && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Invoice</Typography>
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
                <MenuItem value="RatingHighToLow">Rating (High &gt; Low)</MenuItem>
                <MenuItem value="RatingLowToHigh">Rating (Low &gt; High)</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <div className="table-container">
            <table className="review-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Create</th>
                  <th>Due</th>
                  <th>Amount</th>
                  <th>Sent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews && filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.id}</td>
                      <td>{review.product}</td>
                      <td>{review.rating}</td>
                      <td>{review.published ? 'Yes' : 'No'}</td>
                      <td>
                        <IconButton onClick={() => handleView(review.id)} title="View">
                          <VisibilityIcon className="aquablue" />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(review.id)} title="Edit">
                          <EditIcon className="green" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(review.id)} title="Delete">
                          <DeleteIcon className="red" />
                        </IconButton>
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
      )}
      {showInvoice && <Invoice />}
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
