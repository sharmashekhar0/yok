/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { fetchAboutUs } from 'src/api/api';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AboutUs() {
  const [editorValue, setEditorValue] = useState('');
  const [existingAboutUs, setExistingAboutUs] = useState(null);

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      const aboutUsData = await fetchAboutUs();
      console.log('About Us Response :: ', aboutUsData); // Log the aboutUsData directly
      setExistingAboutUs(aboutUsData); // Set the aboutUsData directly
      setEditorValue(aboutUsData.content || '');
    } catch (error) {
      console.error('Error fetching about us:', error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleFormSubmit = async () => {
    try {
      const apiEndpoint = existingAboutUs ? 'update' : 'create';
      const method = 'post';
      const requestData = {
        content: editorValue,
      };

      // If existingAboutUs is present, include _id in the request data
      if (existingAboutUs) {
        requestData._id = existingAboutUs._id;
      }

      const response = await axios({
        method: method,
        url: `${BASE_URL}/about-us/${apiEndpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ...requestData,
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`About Us ${existingAboutUs ? 'updated' : 'created'} successfully`);
        fetchAboutUsData(); // Fetch the updated about us
      } else {
        console.error(`Failed to ${existingAboutUs ? 'update' : 'create'} terms and conditions`);
      }
    } catch (error) {
      console.error('Error submitting about us:', error);
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>

        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
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
          onClick={handleFormSubmit}
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}
