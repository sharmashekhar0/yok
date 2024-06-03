/* eslint-disable */
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';
// import NewCustomProduct from '../NewCustomProduct';
// import ViewCustomProduct from '../view/ViewCustomProduct';
import ViewCustomProductRequest from '../view/ViewCustomProductRequest';

import Iconify from 'src/components/iconify';

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

import './customProductRequestsView.css';
import { getCustomProductRequests, deleteCustomProductRequestAPI } from 'src/api/api';

export default function CustomProductRequestsPage() {
  const [activeButton, setActiveButton] = useState('customProductRequests');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleNewCustomProductButtonClick = () => {
    setActiveButton('newCustomProduct');
  };

  const [customProductRequests, setCustomProductRequests] = useState(null);
  const [clickedProduct, setClickedProduct] = useState(null);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getCustomProductRequests();
      console.log('Custom Product Requests :: ', response?.data);
      setCustomProductRequests(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const dummyProducts = customProductRequests;

  const handleView = (product) => {
    setClickedProduct(product);
    setActiveButton('ViewCustomProductRequest');
  };

  const handleEdit = (product) => {
    setClickedProduct(product);
    setActiveButton('EditCustomProduct');
    console.log(`Edit product with ID: }`);
  };

  const handleDelete = async (product) => {
    console.log('delete', product._id);
    try {
      const response = await deleteCustomProductRequestAPI({ productId: product._id });
      console.log('response delete', response);
      setCustomProductRequests(customProductRequests.filter((pro) => pro._id !== product._id));
    } catch (error) {
      console.log('error on delete product :: ', error);
    }
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const totalPages = Math.ceil(dummyProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredProducts = dummyProducts
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
    console.log('Custom Product Requests :: ', customProductRequests);
  };

  return (
    <Container>
      {activeButton === 'customProductRequests' && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Custom Product Requests</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2} // Add some gap between the components
            mb={5}
          >
            {/* Search TextField */}
            <Box
              sx={{
                width: '50%', // Set width to 50%
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
          </Stack>

          <div className="table-container">
            <table className="product-table">
              <thead>
                {/* {
      _id: '6658157eeba90c4d11c9dcf7',
      userId: '66181b87e400ebc6d8a139a1',
      name: 'Hugh Jackman',
      imageUrl: 
        'https://myawsproductsbucket.s3.ap-south-1.amazonaws.com/1717048702287-user%20%283%29.png',
      color: '#0400f5',
      side: 'front',
      customizationType: 'Print',
      customizePolos: '',
      customizeBasics: 'Center',
      createdAt: '2024-05-30T05:58:22.966Z',
      updatedAt: '2024-05-30T05:58:22.966Z',
      __v: 0
    }
  ] */}
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Color</th>
                  <th>Side</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.name}</td>
                      <td>
                        <img src={product.imageUrl} height={'80px'} width={'80px'} alt="" />
                      </td>
                      <td>
                        <div
                          style={{
                            backgroundColor: product.color,
                            height: '40px',
                            width: '40px',
                            display: 'inline-block',
                          }}
                        ></div>
                      </td>

                      <td>{product.side}</td>
                      <td>
                        <IconButton onClick={() => handleView(product)} title="View">
                          <VisibilityIcon className="aquablue" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(product)} title="Delete">
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
      )}
      {activeButton === 'ViewCustomProductRequest' && (
        <ViewCustomProductRequest clickedProduct={clickedProduct} />
      )}
    </Container>
  );
}
