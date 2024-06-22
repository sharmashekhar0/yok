/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';

import './userView.css';

import { Box, IconButton, TextField } from '@mui/material';
import { deleteUser, getAllUsers } from 'src/api/api';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [activeButton, setActiveButton] = useState('product');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getAllUsers();
        setUser(response?.users.filter((u) => u.role !== 'admin' && u.role !== 'superAdmin'));

        console.log('response', response);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadUsers();
  }, []);

  // For testing pagination
  // const dummyData = [
  //   {
  //     id: 1,
  //     name: 'Alice Williams',
  //     email: 'alice.williams@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 8,
  //   },
  //   {
  //     id: 2,
  //     name: 'Michael Brown',
  //     email: 'michael.brown@example.com',
  //     phone: '+9988776655',
  //     numberOfOrders: 12,
  //   },
  //   {
  //     id: 3,
  //     name: 'Emily Davis',
  //     email: 'emily.davis@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 20,
  //   },
  //   {
  //     id: 4,
  //     name: 'Sarah Miller',
  //     email: 'sarah.miller@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 5,
  //   },
  //   {
  //     id: 5,
  //     name: 'James Wilson',
  //     email: 'james.wilson@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 18,
  //   },
  //   {
  //     id: 6,
  //     name: 'Mary Smith',
  //     email: 'mary.smith@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 15,
  //   },
  //   {
  //     id: 7,
  //     name: 'David Johnson',
  //     email: 'david.johnson@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 10,
  //   },
  //   {
  //     id: 8,
  //     name: 'Jennifer Jones',
  //     email: 'jennifer.jones@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 7,
  //   },
  //   {
  //     id: 9,
  //     name: 'Christopher Davis',
  //     email: 'christopher.davis@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 22,
  //   },
  //   {
  //     id: 10,
  //     name: 'Patricia Wilson',
  //     email: 'patricia.wilson@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 13,
  //   },
  //   {
  //     id: 11,
  //     name: 'Daniel Taylor',
  //     email: 'daniel.taylor@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 9,
  //   },
  //   {
  //     id: 12,
  //     name: 'Elizabeth Anderson',
  //     email: 'elizabeth.anderson@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 16,
  //   },
  //   {
  //     id: 13,
  //     name: 'Matthew Clark',
  //     email: 'matthew.clark@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 11,
  //   },
  //   {
  //     id: 14,
  //     name: 'Linda Lee',
  //     email: 'linda.lee@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 19,
  //   },
  //   {
  //     id: 15,
  //     name: 'Andrew Hall',
  //     email: 'andrew.hall@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 14,
  //   },
  //   {
  //     id: 16,
  //     name: 'Karen Allen',
  //     email: 'karen.allen@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 6,
  //   },
  //   {
  //     id: 17,
  //     name: 'Mark Young',
  //     email: 'mark.young@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 21,
  //   },
  //   {
  //     id: 18,
  //     name: 'Susan Harris',
  //     email: 'susan.harris@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 10,
  //   },
  //   {
  //     id: 19,
  //     name: 'Joseph Martin',
  //     email: 'joseph.martin@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 8,
  //   },
  //   {
  //     id: 20,
  //     name: 'Nancy Scott',
  //     email: 'nancy.scott@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 17,
  //   },
  //   {
  //     id: 21,
  //     name: 'Sarah Thompson',
  //     email: 'sarah.thompson@example.com',
  //     phone: '+1122334455',
  //     numberOfOrders: 12,
  //   },
  // ];

  const dummyData = user;

  const handleView = (productId) => {
    console.log(`View product with ID: ${productId}`);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = async (id) => {
    console.log(`Delete product with ID: ${id}`);
    try {
      const response = await deleteUser({ userId: id });
      console.log('response delete', response);
      setUser(user.filter((pro) => pro._id !== id));
    } catch (error) {
      console.log('error on delete ptoduct ', error);
    }
  };
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const totalPages = Math.ceil(dummyData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredProducts = dummyData
    ?.filter((product) => {
      const searchTermLower = searchTerm.toLowerCase();
      return Object.values(product).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'RatingHighToLow') {
        return a.price > b.price ? -1 : 1;
      } else if (sortOption === 'RatingLowToHigh') {
        return a.price < b.price ? -1 : 1;
      } else if (sortOption === 'NumOfSaleHighToLow') {
        return b.quantity - a.quantity;
      } else if (sortOption === 'NumOfSaleLowToHigh') {
        return a.quantity - b.quantity;
      } else if (sortOption === 'BasePriceHighToLow') {
        return a.price > b.price ? -1 : 1;
      } else if (sortOption === 'BasePriceLowToHigh') {
        return a.price < b.price ? -1 : 1;
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
          <Typography variant="h4">User</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          mb={5}
        >
          <Box
            sx={{
              width: '50%',
            }}
          >
            <TextField
              fullWidth
              label="Search (Email, name...)"
              id="fullWidth"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>
        </Stack>

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email address</th>
                {/* <th>Phone</th>
                  <th>Number of Orders</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                  <tr key={product.id}>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    {/* <td>{product.phone}</td>
                      <td>{product.numberOfOrders}</td> */}
                    <td>
                      {/* <IconButton onClick={() => handleView(product.id)} title="View">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(product.id)} title="Edit">
                          <EditIcon />
                        </IconButton> */}
                      <IconButton onClick={() => handleDelete(product._id)} title="Delete">
                        <DeleteIcon className="red" />
                      </IconButton>
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
      </div>
    </Container>
  );
}
