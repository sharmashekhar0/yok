/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createTestimonialAPI } from '../../api/api';

const NewTestimonial = () => {
  const { register, handleSubmit, watch } = useForm();

  const [testimonialData, setTestimonialData] = useState({
    name: '',
    avatar: null,
    rating: '',
    content: '',
    city: '',
  });

  const avatar = watch('avatar');

  useEffect(() => {
    setTestimonialData((prevState) => ({
      ...prevState,
      avatar: (avatar && avatar[0]) || null,
    }));
  }, [avatar]);

  const createNewTestimonialHandler = async (formData) => {
    try {
      const data = {
        name: formData?.name,
        avatar: formData?.avatar[0],
        rating: formData?.rating,
        content: formData?.content,
        city: formData?.city,
      };
      console.log('Form Data New Testimonial :: ', data);
      const response = await createTestimonialAPI(data);
      console.log('Response new testimonial :: ', response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Testimonial has been created',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log('Error while creating new testimonial :: ', error);
    }
  };

  return (
    <Container style={{ width: '70%' }}>
      <form onSubmit={handleSubmit(createNewTestimonialHandler)}>
        <Typography variant="h4" gutterBottom>
          Testimonial
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
              {...register('avatar', { required: true })}
            />
            <div className="Neon-input-dragDrop">
              <div className="Neon-input-inner">
                <div className="Neon-input-icon">
                  <i className="fa fa-file-image-o"></i>
                </div>
                <div className="Neon-input-text">
                  <h3>Upload a Avatar</h3>{' '}
                </div>
                <a className="Neon-input-choose-btn blue">Click to upload avatar</a>
              </div>
              {testimonialData.avatar && (
                <div>
                  <Typography variant="subtitle1">Selected Avatar:</Typography>
                  <img
                    src={URL.createObjectURL(testimonialData.avatar)}
                    alt="Selected"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Stack
          className="input-section"
          sx={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <TextField
            className="input-box"
            style={{ width: '100%' }}
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            {...register('rating', { required: true })}
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
            id="outlined-basic"
            label="Content"
            variant="outlined"
            {...register('content', { required: true })}
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
            id="outlined-basic"
            label="City"
            variant="outlined"
            {...register('city', { required: true })}
          />
        </Stack>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewTestimonial;
