/* eslint-disable */
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { fetchPrivacyPolicy } from "src/api/api";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function PrivacyPolicy() {
  const [editorValue, setEditorValue] = useState("");
  const [existingPolicy, setExistingPolicy] = useState(null);

  useEffect(() => {
    // Fetch the existing privacy policy on component mount
    fetchPrivacyPolicydata();
  }, []);

  const fetchPrivacyPolicydata = async () => {
    try {
      const response = await fetchPrivacyPolicy();
      if (response.status === 200) {
        setExistingPolicy(response.data.privacyPolicy);
        setEditorValue(response.data.privacyPolicy.content || "");
      } else {
        console.error("Failed to fetch privacy policy");
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleFormSubmit = async () => {
    try {
      const apiEndpoint = existingPolicy ? "update" : "create";
      const method = "post";
      const requestData = {
        content: editorValue,
      };

      // If existingPolicy is present, include _id in the request data
      if (existingPolicy) {
        requestData._id = existingPolicy._id;
      }

      const response = await axios({
        method: method,
        url: `${BASE_URL}/policy/${apiEndpoint}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...requestData
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`Privacy policy ${existingPolicy ? 'updated' : 'created'} successfully`);
        fetchPrivacyPolicy(); // Fetch the updated policy after submission
      } else {
        console.error(`Failed to ${existingPolicy ? 'update' : 'create'} privacy policy`);
      }
    } catch (error) {
      console.error("Error submitting privacy policy:", error);
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}
