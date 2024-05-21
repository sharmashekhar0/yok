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
  }, []);

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

  // const dummyCoupons = [
  //   {
  //     startDate: '2023-05-01',
  //     endDate: '2023-05-15',
  //     discount: '20%',
  //     quantity: '100',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2023-06-01',
  //     endDate: '2023-06-10',
  //     discount: '15%',
  //     quantity: '50',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2023-07-01',
  //     endDate: '2023-07-31',
  //     discount: '25%',
  //     quantity: '200',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2023-08-05',
  //     endDate: '2023-08-20',
  //     discount: '10%',
  //     quantity: '75',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2023-09-01',
  //     endDate: '2023-09-15',
  //     discount: '30%',
  //     quantity: '150',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2023-10-01',
  //     endDate: '2023-10-31',
  //     discount: '18%',
  //     quantity: '100',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2023-11-01',
  //     endDate: '2023-11-15',
  //     discount: '22%',
  //     quantity: '80',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2023-12-01',
  //     endDate: '2023-12-25',
  //     discount: '12%',
  //     quantity: '60',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2024-01-01',
  //     endDate: '2024-01-10',
  //     discount: '28%',
  //     quantity: '90',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-02-01',
  //     endDate: '2024-02-28',
  //     discount: '16%',
  //     quantity: '120',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-03-01',
  //     endDate: '2024-03-15',
  //     discount: '24%',
  //     quantity: '110',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2024-04-01',
  //     endDate: '2024-04-30',
  //     discount: '8%',
  //     quantity: '70',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-05-01',
  //     endDate: '2024-05-10',
  //     discount: '32%',
  //     quantity: '100',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-06-01',
  //     endDate: '2024-06-15',
  //     discount: '14%',
  //     quantity: '85',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2024-07-01',
  //     endDate: '2024-07-31',
  //     discount: '26%',
  //     quantity: '160',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-08-01',
  //     endDate: '2024-08-20',
  //     discount: '9%',
  //     quantity: '50',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-09-01',
  //     endDate: '2024-09-15',
  //     discount: '29%',
  //     quantity: '140',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2024-10-01',
  //     endDate: '2024-10-31',
  //     discount: '19%',
  //     quantity: '95',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-11-01',
  //     endDate: '2024-11-15',
  //     discount: '23%',
  //     quantity: '75',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2024-12-01',
  //     endDate: '2024-12-25',
  //     discount: '13%',
  //     quantity: '55',
  //     status: 'Inactive',
  //   },
  //   {
  //     startDate: '2025-01-01',
  //     endDate: '2025-01-10',
  //     discount: '27%',
  //     quantity: '88',
  //     status: 'Active',
  //   },
  //   {
  //     startDate: '2025-02-01',
  //     endDate: '2025-02-28',
  //     discount: '17%',
  //     quantity: '115',
  //     status: 'Active',
  //   },
  // ];

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
                      <td>{i + 1}</td>
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
