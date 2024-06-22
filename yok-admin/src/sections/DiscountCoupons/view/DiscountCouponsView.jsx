/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';

import Iconify from 'src/components/iconify';

import './DiscountCoupons.css';
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
import NewDiscountCoupon from './NewDiscountCoupon';
import { deleteCoupons, getCoupons } from 'src/api/api';
import EditViewDiscountCoupon from './EditViewDiscountCoupon';
// import NewProduct from "../NewProduct";

export default function DiscountCouponsView() {
  const [activeButton, setActiveButton] = useState('product');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [newCouponForm, setNewCouponForm] = useState({
    coupon: '',
    startDate: '',
    endDate: '',
    discount: '',
    quantity: '',
    status: '',
  });

  const [coupons, setCoupons] = useState(null);
  const [clickedCoupon, setClickedCoupon] = useState(null);

  useEffect(() => {
    loadCoupons();
  }, [activeButton]);

  const loadCoupons = async () => {
    try {
      const response = await getCoupons();
      console.log('response', response);
      setCoupons(response?.data?.coupons);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNewProductButtonClick = () => {
    setActiveButton('newProduct');
  };

  const dummyCoupons = coupons;

  const handleView = (productId) => {
    setClickedCoupon(productId);
    setActiveButton('view');
    console.log(`View product with ID: ${productId}`);
  };

  const handleEdit = (productId) => {
    setClickedCoupon(productId);
    setActiveButton('edit');
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = async (product) => {
    try {
      const response = await deleteCoupons({ _id: product?._id });
      console.log('response', response);
      console.log('response', product);
      if (response?.data?.message === 'Coupon deleted successfully') {
        const filteredData = coupons.filter((c) => c._id !== product?._id);
        console.log('filteredData', filteredData);
        setCoupons(filteredData);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log('coupons', coupons);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };
  const sortProducts = (a, b) => {
    switch (sortOption) {
      case 'RatingHighToLow':
        return a.id - b.id;
      case 'RatingLowToHigh':
        return b.id - a.id;
      case 'DiscountLowToHigh':
        return parseFloat(b.discount) - parseFloat(a.discount);
      case 'DiscountHighToLow':
        return parseFloat(a.discount) - parseFloat(b.discount);
      default:
        return 0;
    }
  };

  const totalPages = Math.ceil(dummyCoupons?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredProducts = dummyCoupons
    ?.filter((product) => {
      const searchTermLower = searchTerm.toLowerCase();
      return Object.values(product).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLower)
      );
    })
    .sort(sortProducts)
    .slice(startIndex, endIndex);

  const sendUpdatedDataToParent = (data) => {
    coupons.map((c) => {
      if (c._id === data._id) {
        (c.name = data.name),
          (c.type = data.type),
          (c.discount = data.discount),
          (c.minimumQuantity = data.minimumQuantity);
      }
    });
  };

  const createDataForCoupon = (data) => {
    console.log('data to add', data);
    setCoupons([
      ...coupons,
      {
        name: data.name,
        type: data.type,
        discount: data.discount,
        minimumQuantity: data.minimumQuantity,
      },
    ]);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      {activeButton === 'product' && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Coupons</Typography>

            <Button
              onClick={handleNewProductButtonClick}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Coupon
            </Button>
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
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Coupon</th>
                  <th>Type</th>
                  <th>Discount</th>
                  <th>Minimum Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <tr key={i}>
                      <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.type}</td>
                      <td>{product.discount}</td>
                      <td>{product.minimumQuantity}</td>
                      <td>
                        <IconButton onClick={() => handleView(product)} title="View">
                          <VisibilityIcon className="aquablue" />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(product)} title="Edit">
                          <EditIcon className="green" />
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
          </div>
        </div>
      )}
      {activeButton === 'newProduct' && (
        <NewDiscountCoupon
          createDataForCoupon={createDataForCoupon}
          setActiveButton={setActiveButton}
        />
      )}

      {(activeButton === 'edit' || activeButton === 'view') && (
        <EditViewDiscountCoupon
          sendUpdatedDataToParent={sendUpdatedDataToParent}
          clickedCoupon={clickedCoupon}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      )}
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
