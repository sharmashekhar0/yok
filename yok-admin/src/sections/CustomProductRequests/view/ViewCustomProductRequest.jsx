/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { InputAdornment, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

const ViewCustomProductRequest = ({ clickedProduct }) => {
  console.log('Clicked Custom Product Request :: ', clickedProduct);

  return (
    <Container style={{ width: '70%' }}>
      <form>
        <Typography variant="h4" gutterBottom>
          Custom Product Request
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
            label="Product Name"
            disabled
            value={clickedProduct?.productName}
            variant="outlined"
          />
        </Stack>
        {clickedProduct?.name && (
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
              disabled
              value={clickedProduct?.name}
              variant="outlined"
            />
          </Stack>
        )}
        {clickedProduct?.imageUrl && (
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
                disabled
              />
              <div className="Neon-input-dragDrop" style={{ marginBottom: '10px' }}>
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    <i className="fa fa-file-image-o"></i>
                  </div>
                  <div className="Neon-input-text"></div>
                </div>
                <div>
                  <img
                    src={clickedProduct?.imageUrl}
                    alt="Selected"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
            label="Color"
            value={clickedProduct?.color}
            disabled
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: clickedProduct?.color,
                      marginRight: '10px',
                      border: '1px solid #ccc',
                    }}
                  ></div>
                </InputAdornment>
              ),
            }}
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
            label="Customization Type"
            value={clickedProduct?.customizeBasics}
            disabled
            variant="outlined"
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
            label="Customization"
            value={clickedProduct?.customizationType}
            disabled
            variant="outlined"
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
            label="Side"
            value={clickedProduct?.side}
            disabled
            variant="outlined"
          />
        </Stack>
      </form>
    </Container>
  );
};

export default ViewCustomProductRequest;
