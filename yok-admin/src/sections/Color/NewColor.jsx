/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { Stack, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createColor } from 'src/api/api';

const NewColor = () => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const [colorData, setColorData] = useState({
    name: '',
    color: '#000000',
  });

  const icon = watch('icon');
  const color = watch('color', '#000000');

  useEffect(() => {
    setColorData((prevState) => ({
      ...prevState,
      color: color || '#000000',
    }));
  }, [color]);

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setValue('color', selectedColor);
  };

  const createNewColorHandler = async (formData) => {
    try {
      const data = {
        name: formData?.name,
        hexcode: formData?.color,
      };
      console.log('Form Data New Color :: ', data);
      const response = await createColor(data);
      console.log('Response new color :: ', response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Color has been added',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log('Error while creating adding color :: ', error);
    }
  };

  return (
    <Container style={{ width: '70%' }}>
      <form onSubmit={handleSubmit(createNewColorHandler)}>
        <Typography variant="h4" gutterBottom>
          Variation
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
            label="Color Name"
            variant="outlined"
            {...register('name', { required: true })}
          />
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
            id="outlined-color"
            label="Pick a Color"
            variant="outlined"
            value={color}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    style={{
                      border: 'none',
                      background: 'none',
                      width: '24px',
                      height: '24px',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            {...register('color', { required: true })}
          />
        </Stack>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewColor;
