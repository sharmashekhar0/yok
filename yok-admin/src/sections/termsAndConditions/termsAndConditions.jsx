/* eslint-disable */
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { fetchTermsCondition } from "src/api/api";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function TermsAndConditions() {
  const [editorValue, setEditorValue] = useState("");
  const [existingTerms, setExistingTerms] = useState(null);

  useEffect(() => {
    // Fetch the existing terms and conditions on component mount
    fetchTermsConditionData();
  }, []);

  const fetchTermsConditionData = async () => {
    try {
      const response = await fetchTermsCondition();
      if (response.status === 200) {
        setExistingTerms(response.data.termsConditions);
        setEditorValue(response.data.termsConditions.content || "");
      } else {
        console.error("Failed to fetch terms and conditions");
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleFormSubmit = async () => {
    try {
      const apiEndpoint = existingTerms ? "update" : "create";
      const method = "post";
      const requestData = {
        content: editorValue,
      };

      // If existingTerms is present, include _id in the request data
      if (existingTerms) {
        requestData._id = existingTerms._id;
      }

      const response = await axios({
        method: method,
        url: `${BASE_URL}/terms/${apiEndpoint}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...requestData
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`Terms and conditions ${existingTerms ? 'updated' : 'created'} successfully`);
        fetchTermsConditionData(); // Fetch the updated terms after submission
      } else {
        console.error(`Failed to ${existingTerms ? 'update' : 'create'} terms and conditions`);
      }
    } catch (error) {
      console.error("Error submitting terms and conditions:", error);
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
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
