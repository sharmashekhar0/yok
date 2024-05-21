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

// import "./ProductsView.css";
import './B2B.css';
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
// import NewProduct from "../NewProduct";
import { getProducts, deleteProductAPI, getB2B } from 'src/api/api';
// import ViewProduct from "./ViewProduct";
// import EditProduct from "./EditProduct";

export default function B2B() {
  const [activeButton, setActiveButton] = useState('product');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleNewProductButtonClick = () => {
    console.log('cli');
    setActiveButton('newProduct');
    // navigate('/product/add-product')
  };
  const [products, setProducts] = useState(null);
  const [clickedProduct, setClickedProduct] = useState(null);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getB2B();
      setProducts(response?.data);
      console.log('response products', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  const dummyProducts = products;

  const handleView = (product) => {
    setClickedProduct(product);
    setActiveButton('viewProduct');
  };

  const handleEdit = (product) => {
    setClickedProduct(product);
    setActiveButton('EditProduct');
    console.log(`Edit product with ID: }`);
  };

  const handleDelete = async (product) => {
    console.log('dlete', product._id);
    try {
      const response = await deleteProductAPI({ productId: product._id });
      console.log('response delete', response);
      setProducts(products.filter((pro) => pro._id !== product._id));
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
  };

  return (
    <Container>
      {activeButton === 'product' && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">B2B</Typography>
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
                label="Search"
                id="fullWidth"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>

            {/* <FormControl variant="outlined" sx={{ width: '50%', minWidth: 120 }}>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by"
                label="Sort By"
                value={sortOption}
                onChange={handleSort}
              >
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="RatingHighToLow">Rating (High &gt; Low)</MenuItem>
                <MenuItem value="RatingLowToHigh">Rating (Low &gt; High)</MenuItem>
                <MenuItem value="NumOfSaleHighToLow">Num of Sale (High &gt; Low)</MenuItem>
                <MenuItem value="NumOfSaleLowToHigh">Num of Sale (Low &gt; High)</MenuItem>
                <MenuItem value="BasePriceHighToLow">Base Price (High &gt; Low)</MenuItem>
                <MenuItem value="BasePriceLowToHigh">Base Price (Low &gt; High)</MenuItem>
              </Select>
            </FormControl> */}
          </Stack>

          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Phone</th>
                  <th>Number of Shops</th>
                  <th>quantity</th>
                  <th>Selected Checkboxes</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts?.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.email}</td>
                      <td>{product.message}</td>
                      <td>{product.phone}</td>
                      <td>{product.numberOfShops}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {product.selectedCheckboxes.map((checkbox, index) => (
                          <span key={index}>
                            {checkbox}
                            {index !== product.selectedCheckboxes.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </td>
                      {/* <td>
                        <IconButton onClick={() => handleView(product)} title="View">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(product)} title="Edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(product)} title="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </td> */}
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
      {/* {activeButton === "newProduct" && <NewProduct />}
      {activeButton === "viewProduct" && <ViewProduct clickedProduct={clickedProduct}/>}
      {activeButton === "EditProduct" && <EditProduct clickedProduct={clickedProduct}/>} */}
    </Container>
  );
}
