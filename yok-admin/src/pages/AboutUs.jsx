/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AboutUs() {
  //TODO: Write logic here for fetching and submitting about us content.

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>

        <ReactQuill
          value={'This is about us page'}
          // onChange={handleEditorChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        />

        <Button
          variant="contained"
          color="primary"
          // onClick={handleFormSubmit}
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}
