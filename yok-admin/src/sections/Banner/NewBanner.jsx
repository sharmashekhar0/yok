/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createBannerAPI } from 'src/api/api';
import Swal from 'sweetalert2';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NewBanner = ({ setActiveButton }) => {
  const [productData, setProductData] = useState({
    title: '',
    slug: '',
    desktopImage: null,
    mobileImage: null,
  });

  const [errors, setErrors] = useState({
    title: '',
    slug: '',
    desktopImage: '',
    mobileImage: '',
    position: '',
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    const updatedErrors = { ...errors };
    if (files) {
      if (name === 'desktopImage' || name === 'mobileImage') {
        setProductData((prevState) => ({
          ...prevState,
          [name]: files[0],
        }));
        updatedErrors[name] = '';
      } else if (name === 'gallery') {
        const selectedFiles = Array.from(files).slice(0, 10);
        setProductData((prevState) => ({
          ...prevState,
          gallery: selectedFiles,
        }));
        updatedErrors[name] = '';
      }
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      updatedErrors[name] = '';
    }
    setErrors(updatedErrors);
  };
  console.log('productData', productData);
  const handlePositionChange = (event) => {
    const { value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      position: value, // Update state for position selection
    }));
  };
  const handleSubmit = async () => {
    // Perform submission logic here
    console.log('Submitting banner data:', productData);

    const updatedErrors = {};

    if (!productData.title) {
      updatedErrors.title = 'Title is required';
    }
    if (!productData.slug) {
      updatedErrors.slug = 'Slug is required';
    }
    if (!productData.desktopImage) {
      updatedErrors.desktopImage = 'Desktop Image is required';
    }
    if (!productData.mobileImage) {
      updatedErrors.mobileImage = 'Mobile Image is required';
    }
    if (!productData.position) {
      updatedErrors.position = 'Position is required';
    }

    // Check if there are any errors
    if (Object.keys(updatedErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...updatedErrors,
      }));
      return;
    }

    const formData = new FormData();
    formData.append('desktopImage', productData.desktopImage);
    formData.append('mobileImage', productData.mobileImage);
    formData.append('slug', productData.slug);
    formData.append('title', productData.title);
    formData.append('position', productData.position);
    const response = await createBannerAPI(formData);
    console.log(response);
    if (response.success) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Banner has been created',
        showConfirmButton: false,
        timer: 1500,
      });
      setProductData({
        title: '',
        slug: '',
        desktopImage: null,
        mobileImage: null,
      });
      setActiveButton('banner');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong.',
        showConfirmButton: true,
        confirmButtonText: 'Try Again',
      });
    }
    console.log('banner created successfully:', response);
  };
  return (
    <Container style={{ width: '70%' }}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Create a new product</Typography>
        <IconButton onClick={() => setActiveButton('banner')} title="Close">
          <CloseIcon className="red" />
        </IconButton>
      </Stack>
      <Stack
        className="input-section"
        sx={{
          marginBottom: '10px',
        }}
      >
        <TextField
          className="input-box"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
        />
        {errors.title && <div style={{ color: 'red', fontSize: '15px' }}>{errors.title}</div>}
      </Stack>
      <div className="input-section">
        <TextField
          className="input-box"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Slug"
          variant="outlined"
          name="slug"
          value={productData.slug}
          onChange={handleInputChange}
        />
        {errors.slug && <div style={{ color: 'red', fontSize: '15px' }}>{errors.slug}</div>}
      </div>

      <div className="mt-3">
        <div className="Neon Neon-theme-dragdropbox">
          <input
            style={{
              opacity: 0,
              width: '100%',
              height: '99px',
              position: 'absolute',
              right: '0px',
              left: '0px',
            }}
            accept="image/*"
            id="desktop-image-upload"
            multiple={false}
            name="desktopImage"
            type="file"
            onChange={handleInputChange}
          />
          <div className="Neon-input-dragDrop">
            <div className="Neon-input-inner">
              <div className="Neon-input-icon">
                <i className="fa fa-file-image-o"></i>
              </div>
              <div className="Neon-input-text">
                <h3>Upload a Desktop image</h3>{' '}
              </div>
              <a className="Neon-input-choose-btn blue">Click to upload Desktop image</a>
            </div>
            {productData.desktopImage && (
              <div>
                <Typography variant="subtitle1">Selected Image:</Typography>
                <img
                  src={URL.createObjectURL(productData.desktopImage)}
                  alt="Selected"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </div>
            )}
            {errors.desktopImage && (
              <div style={{ color: 'red', fontSize: '15px' }}>{errors.desktopImage}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="Neon Neon-theme-dragdropbox">
          <input
            style={{
              opacity: 0,
              width: '100%',
              height: '99px',
              position: 'absolute',
              right: '0px',
              left: '0px',
            }}
            accept="image/*"
            id="mobile-image-upload"
            multiple={false}
            name="mobileImage"
            type="file"
            onChange={handleInputChange}
          />
          <div className="Neon-input-dragDrop">
            <div className="Neon-input-inner">
              <div className="Neon-input-icon">
                <i className="fa fa-file-image-o"></i>
              </div>
              <div className="Neon-input-text">
                <h3>Upload a Mobile image</h3>{' '}
              </div>
              <a className="Neon-input-choose-btn blue">Click to upload Mobile image</a>
            </div>
            {productData.mobileImage && (
              <div>
                <Typography variant="subtitle1">Selected Image:</Typography>
                <img
                  src={URL.createObjectURL(productData.mobileImage)}
                  alt="Selected"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </div>
            )}
            {errors.mobileImage && (
              <div style={{ color: 'red', fontSize: '15px' }}>{errors.mobileImage}</div>
            )}
          </div>
        </div>
        {/* Position dropdown */}
        <TextField
          select
          label="Position"
          value={productData.position}
          onChange={handlePositionChange}
          variant="outlined"
          sx={{
            marginTop: '10px',
            width: '100%',
          }}
        >
          <MenuItem value="first">First Banner</MenuItem>
          <MenuItem value="second">Second Banner</MenuItem>
          <MenuItem value="third">Third Banner</MenuItem>
          <MenuItem value="fourth">Fourth Banner</MenuItem>
          <MenuItem value="fifth">Fifth Banner</MenuItem>
        </TextField>
        {errors.position && <div style={{ color: 'red', fontSize: '15px' }}>{errors.position}</div>}
        {/* Submit button */}
        <div className="mt-3">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NewBanner;
