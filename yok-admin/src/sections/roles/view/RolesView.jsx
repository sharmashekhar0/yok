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

import Iconify from 'src/components/iconify';

import './RolesView.css';

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
        setUser(response?.users.filter((u) => u.role === 'admin' || u.role === 'superAdmin'));

        console.log('response', response);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadUsers();
  }, []);

  /* const dummyData = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
    },
    {
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
    },
    {
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
    },
    {
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
    },
    {
      name: 'Liam Smith',
      email: 'liam.smith@example.com',
    },
    {
      name: 'Olivia Johnson',
      email: 'olivia.johnson@example.com',
    },
    {
      name: 'Ethan Brown',
      email: 'ethan.brown@example.com',
    },
    {
      name: 'Ava Wilson',
      email: 'ava.wilson@example.com',
    },
    {
      name: 'Lucas Davis',
      email: 'lucas.davis@example.com',
    },
    {
      name: 'Mia Smith',
      email: 'mia.smith@example.com',
    },
    {
      name: 'Noah Johnson',
      email: 'noah.johnson@example.com',
    },
    {
      name: 'Sophia Brown',
      email: 'sophia.brown@example.com',
    },
    {
      name: 'William Smith',
      email: 'william.smith@example.com',
    },
    {
      name: 'Ella Johnson',
      email: 'ella.johnson@example.com',
    },
    {
      name: 'Liam Brown',
      email: 'liam.brown@example.com',
    },
    {
      name: 'Ava Smith',
      email: 'ava.smith@example.com',
    },
    {
      name: 'Lucas Johnson',
      email: 'lucas.johnson@example.com',
    },
    {
      name: 'Mia Brown',
      email: 'mia.brown@example.com',
    },
    {
      name: 'Noah Smith',
      email: 'noah.smith@example.com',
    },
  ]; */

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
                    <td>{i + 1}</td>
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
    </Container>
  );
}
