/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { IconButton, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createBrand } from 'src/api/api';
import CloseIcon from '@mui/icons-material/Close';

const newBrand = ({ setActiveButton }) => {
  const { register, handleSubmit, watch } = useForm();

  const [brandData, setBrandData] = useState({
    icon: null,
    name: '',
  });

  const icon = watch('icon');

  useEffect(() => {
    setBrandData((prevState) => ({
      ...prevState,
      icon: (icon && icon[0]) || null,
    }));
  }, [icon]);

  const createNewBrandHandler = async (formData) => {
    try {
      const data = {
        name: formData?.name,
        icon: formData?.icon[0],
      };
      console.log('Form Data New Brand :: ', data);
      const response = await createBrand(data);
      console.log('Response new brand :: ', response);
      if (response?.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Brand has been added',
          showConfirmButton: false,
          timer: 1500,
        });
        setActiveButton('brand');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong.',
          showConfirmButton: true,
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.log('Error while creating adding brand :: ', error);
    }
  };

  return (
    <Container style={{ width: '70%' }}>
      <form onSubmit={handleSubmit(createNewBrandHandler)}>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Create a new product</Typography>
          <IconButton onClick={() => setActiveButton('brand')} title="Close">
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
            label="Name"
            variant="outlined"
            {...register('name', { required: true })}
          />
        </Stack>
        <div>
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
              type="file"
              {...register('icon', { required: true })}
            />
            <div className="Neon-input-dragDrop" style={{ marginBottom: '10px' }}>
              <div className="Neon-input-inner">
                <div className="Neon-input-icon">
                  <i className="fa fa-file-image-o"></i>
                </div>
                <div className="Neon-input-text">
                  <h3>Upload a Icon</h3>{' '}
                </div>
                <a className="Neon-input-choose-btn blue">Click to upload icon</a>
              </div>
              {brandData.icon && (
                <div>
                  <Typography variant="subtitle1">Selected icon:</Typography>
                  <img
                    src={URL.createObjectURL(brandData.icon)}
                    alt="Selected"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default newBrand;
