/* eslint-disable */
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { getFAQ, addFAQ, deleteFAQ } from "../api/api"; // Import the API functions
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Iconify from "src/components/iconify";

export default function FAQ() {
  const [faqData, setFAQData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getFAQ();
      setFAQData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ question: "", answer: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFAQ = async () => {
    try {
      await addFAQ(formData);
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding FAQ:", error);
    }
  };

  const handleDeleteFAQ = async (id) => {
    try {
      await deleteFAQ(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Frequently Asked Questions</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenDialog}
        >
          Add FAQ
        </Button>
      </Stack>

      <Stack spacing={2}>
        {faqData.map((faq) => (
          <Accordion key={faq._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${faq._id}-content`}
              id={`faq-${faq._id}-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
              <Button
                style={{marginTop: '10px'}}
                variant="outlined"
                color="error"
                onClick={() => handleDeleteFAQ(faq._id)}
              >
                Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      {/* Add FAQ Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add FAQ</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAddFAQ} color="primary" variant="contained">
            Add FAQ
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
