/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createVariation } from 'src/api/api';

const NewVariation = () => {
  const { register, handleSubmit, watch } = useForm();

  const createNewVariationHandler = async (formData) => {
    try {
      const data = {
        size: formData?.size,
      };
      const response = await createVariation(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Size has been added',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log('Error while creating adding variation :: ', error);
    }
  };

  return (
    <Container style={{ width: '70%' }}>
      <form onSubmit={handleSubmit(createNewVariationHandler)}>
        <Typography variant="h4" gutterBottom>
          Size
        </Typography>
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
            label="Size"
            variant="outlined"
            {...register('size', { required: true })}
          />
        </Stack>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewVariation;
