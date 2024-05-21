/* eslint-disable */
import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { createCoupons, createProductAPI, editCoupons } from "src/api/api";

import { useNavigate } from "react-router-dom";

const EditViewDiscountCoupon = ({ setActiveButton, clickedCoupon, activeButton, sendUpdatedDataToParent }) => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState(clickedCoupon);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const response = await editCoupons(productData);
      console.log("response", response);
      if (response?.data?.message === "Coupon data updated successfully") {
        setActiveButton("product");
        sendUpdatedDataToParent(productData)
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("productData", productData);
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
              defaultValue={clickedCoupon?.name}
              onChange={handleChange}
              disabled={activeButton === "view"}
            />
          </div>

          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="type"
                name="type"
                defaultValue={clickedCoupon?.type}
                onChange={handleChange}
                disabled={activeButton === "view"}
              >
                <MenuItem value={"Flat"}>Flat</MenuItem>
                <MenuItem value={"Percentage"}>Percentage</MenuItem>
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
              defaultValue={clickedCoupon?.discount}
              onChange={handleChange}
              disabled={activeButton === "view"}
            />
          </div>

          <div className="mt-4">
            <TextField
              className="create-product-input-box-two-yok"
              id="outlined-basic"
              label="Minimum Quantity"
              variant="outlined"
              name="minimumQuantity"
              defaultValue={clickedCoupon?.minimumQuantity}
              onChange={handleChange}
              disabled={activeButton === "view"}
            />
          </div>
        </div>
      </div>

      {activeButton !== "view" && <div className="create-product-button-yok">
        <Button
          onClick={handleCreateProduct}
          variant="contained"
          color="inherit"
        >
          Save Coupon
        </Button>
      </div>}
    </div>
  );
};

export default EditViewDiscountCoupon;
