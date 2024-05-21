/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { createCoupons, createProductAPI } from 'src/api/api';

import { useNavigate } from 'react-router-dom';

const NewDiscountCoupon = ({ setActiveButton, createDataForCoupon }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    discount: '',
    quantity: '',
  });

  const [productData, setProductData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedErrors = { ...errors };
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    updatedErrors[name] = '';
    setErrors(updatedErrors);
  };

  const handleCreateProduct = async () => {
    try {
      const updatedErrors = {};

      if (!productData.name) {
        updatedErrors.name = 'Name is required';
      }

      if (Object.keys(updatedErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...updatedErrors,
        }));
        return;
      }

      const response = await createCoupons(productData);
      console.log('response', response);
      if (response?.data?.message === 'Coupon data saved successfully') {
        setActiveButton('product');
        createDataForCoupon(productData);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('productData', productData);
  return (
    <div>
      <Typography variant="h4">Create a new Coupon</Typography>
      <div className="create-product-details-yok">
        <div className="create-product-details-product-name-imagee">
          <div>
            <TextField
              className="create-product-input-box-two-yok"
              id="outlined-basic"
              label="Coupon name"
              variant="outlined"
              name="name"
              onChange={handleChange}
            />
            {errors.name && <div style={{ color: 'red', fontSize: '15px' }}>{errors.name}</div>}
          </div>

          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="type"
                name="type"
                onChange={handleChange}
              >
                <MenuItem value={'Flat'}>Flat</MenuItem>
                <MenuItem value={'Percentage'}>Percentage</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mt-4">
            <TextField
              className="create-product-input-box-two-yok"
              id="outlined-basic"
              label="Discount"
              variant="outlined"
              name="discount"
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <TextField
              className="create-product-input-box-two-yok"
              id="outlined-basic"
              label="Minimum Quantity"
              variant="outlined"
              name="minimumQuantity"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="create-product-button-yok">
        <Button onClick={handleCreateProduct} variant="contained" color="inherit">
          Create Coupon
        </Button>
      </div>
    </div>
  );
};

export default NewDiscountCoupon;
