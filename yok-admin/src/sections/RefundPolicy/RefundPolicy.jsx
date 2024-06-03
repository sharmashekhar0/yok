/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { fetchRefundPolicy } from 'src/api/api';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function RefundPolicy() {
  const [editorValue, setEditorValue] = useState('');
  const [existingRefundPolicy, setExistingRefundPolicy] = useState(null);

  useEffect(() => {
    fetchRefundPolicyData();
  }, []);

  const fetchRefundPolicyData = async () => {
    try {
      const response = await fetchRefundPolicy();
      if (response.status === 200) {
        setExistingRefundPolicy(response.data.refundPolicy);
        setEditorValue(response.data.refundPolicy.content || '');
      } else {
        console.error('Failed to fetch refund policy');
      }
    } catch (error) {
      console.error('Error fetching refund policy:', error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleFormSubmit = async () => {
    try {
      const apiEndpoint = existingRefundPolicy ? 'update' : 'create';
      const method = 'post';
      const requestData = {
        content: editorValue,
      };

      // If existingRefundPolicy is present, include _id in the request data
      if (existingRefundPolicy) {
        requestData._id = existingRefundPolicy._id;
      }

      const response = await axios({
        method: method,
        url: `${BASE_URL}/refund-policy/${apiEndpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ...requestData,
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`Refund Policy ${existingRefundPolicy ? 'updated' : 'created'} successfully`);
        fetchRefundPolicyData();
      } else {
        console.error(`Failed to ${existingRefundPolicy ? 'update' : 'create'} refund policy`);
      }
    } catch (error) {
      console.error('Error submitting refund policy:', error);
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          Refund Policy
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
