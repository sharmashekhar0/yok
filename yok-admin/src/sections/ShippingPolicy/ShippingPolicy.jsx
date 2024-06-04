/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { fetchShippingPolicy } from 'src/api/api';
import Swal from 'sweetalert2';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ShippingPolicy() {
  const [editorValue, setEditorValue] = useState('');
  const [existingShippingPolicy, setExistingShippingPolicy] = useState(null);

  useEffect(() => {
    fetchShippingPolicyData();
  }, []);

  const fetchShippingPolicyData = async () => {
    try {
      const response = await fetchShippingPolicy();
      if (response.status === 200) {
        setExistingShippingPolicy(response?.data?.shippingPolicy);
        setEditorValue(response?.data?.shippingPolicy?.content || '');
      } else {
        console.error('Failed to fetch shipping policy');
      }
    } catch (error) {
      console.error('Error fetching shipping policy:', error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleFormSubmit = async () => {
    try {
      const apiEndpoint = existingShippingPolicy ? 'update' : 'create';
      const method = 'post';
      const requestData = {
        content: editorValue,
      };

      // If existingRefundPolicy is present, include _id in the request data
      if (existingShippingPolicy) {
        requestData._id = existingShippingPolicy._id;
      }

      const response = await axios({
        method: method,
        url: `${BASE_URL}/shipping-policy/${apiEndpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ...requestData,
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(
          `Shipping Policy ${existingShippingPolicy ? 'updated' : 'created'} successfully`
        );
        Swal.fire({
          title: `${existingShippingPolicy ? 'Updated' : 'Created'}!`,
          text: `Your Policy has been ${existingShippingPolicy ? 'Updated' : 'Created'}.`,
          icon: 'success',
        });
        fetchShippingPolicyData();
      } else {
        console.error(`Failed to ${existingShippingPolicy ? 'update' : 'create'} shipping policy`);
      }
    } catch (error) {
      console.error('Error submitting shipping policy:', error);
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          Shipping Policy
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
