/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import { UpdateFindUsHere, getFindUsHere } from '../api/api'; // Import the API function

export default function ContactDetails() {
  const [contactData, setContactData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedContact, setEditedContact] = useState({
    _id: '',
    email: '',
    phone: '',
    address: '',
  });

  console.log('editedContact ikjskjksajkj', contactData);

  useEffect(() => {
    // Fetch contact details when the component mounts
    const fetchData = async () => {
      try {
        const data = await getFindUsHere();
        setContactData(data.data);
        if (data.data.length > 0) {
          setEditedContact({
            ...editedContact,
            _id: data.data[0]._id,
          });
        }
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleEditClick = (contact) => {
    setEditMode(true);
    setEditedContact({ ...contact });
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = await UpdateFindUsHere(editedContact);
      console.log(updatedData);
      let dataaa = [];
      dataaa.push(updatedData.data.data);
      setContactData(dataaa);
      setEditMode(false);
      //   fetchData(); // Fetch updated data
    } catch (error) {
      console.error('Error updating contact details:', error);
    }

    setEditMode(false); // Comment this line when integrating with the actual API
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Contact Us
      </Typography>
      <div className="table-container">
        <Stack spacing={4}>
          {contactData.map((contact) => (
            <div
              key={contact._id}
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Contact Details
              </Typography>
              <div style={{ marginBottom: '10px' }}>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 'bold',
                    display: 'inline-block',
                    width: '100px',
                  }}
                >
                  Email:
                </Typography>
                {editMode ? (
                  <TextField
                    name="email"
                    value={editedContact.email}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{contact.email}</Typography>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 'bold',
                    display: 'inline-block',
                    width: '100px',
                  }}
                >
                  Phone:
                </Typography>
                {editMode ? (
                  <TextField
                    name="phone"
                    value={editedContact.phone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{contact.phone}</Typography>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 'bold',
                    display: 'inline-block',
                    width: '100px',
                  }}
                >
                  Address:
                </Typography>
                {editMode ? (
                  <TextField
                    name="address"
                    value={editedContact.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{contact.address}</Typography>
                )}
              </div>
              {editMode ? (
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditClick(contact)}
                >
                  Edit
                </Button>
              )}
            </div>
          ))}
        </Stack>
      </div>
    </Container>
  );
}
