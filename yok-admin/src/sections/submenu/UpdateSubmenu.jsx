/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, Stack, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { getSubmenus, updateSubmenu } from 'src/api/api';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'src/routes/hooks';

const EditSubmenu = ({ menuId }) => {
  const [menuData, setMenuData] = useState(null);
  let { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Fetch menu data by ID when the component mounts
    const fetchMenuData = async () => {
      try {
        const response = await getSubmenus(id);
        console.log(response.data.CategoryMenu);
        setMenuData(response.data.CategoryMenu); // Assuming the API response contains the menu data
      } catch (error) {
        console.error('Error fetching menu data:', error);
        // Handle error
      }
    };

    fetchMenuData();
  }, [id]);

  const handleColumnAdd = () => {
    // Add a new column
    setMenuData((prevData) => ({
      ...prevData,
      columns: [
        ...(prevData.columns || []), // Use previous columns if available
        { id: (prevData.columns || []).length + 1, columnItems: [] },
      ],
    }));
  };

  const handleColumnItemAdd = (columnIndex) => {
    // Add a new column item to the specified column
    setMenuData((prevData) => ({
      ...prevData,
      columns: prevData.columns.map((column, index) => {
        if (index === columnIndex) {
          return {
            ...column,
            columnItems: [
              ...(column.columnItems || []),
              {
                id: (column.columnItems || []).length + 1,
                path: '',
                label: '',
                columnItemItems: [],
              },
            ],
          };
        }
        return column;
      }),
    }));
  };

  const handleRemoveColumn = (columnIndex) => {
    // Remove the specified column
    setMenuData((prevData) => ({
      ...prevData,
      columns: prevData.columns.filter((_, index) => index !== columnIndex),
    }));
  };

  const handleMenuInputChange = (field, value) => {
    // Update menu input fields
    setMenuData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleColumnItemInputChange = (columnIndex, columnItemIndex, field, value) => {
    // Update column item input fields
    setMenuData((prevData) => ({
      ...prevData,
      columns: prevData.columns.map((column, index) => {
        if (index === columnIndex) {
          return {
            ...column,
            columnItems: column.columnItems.map((item, idx) => {
              if (idx === columnItemIndex) {
                return {
                  ...item,
                  [field]: value,
                };
              }
              return item;
            }),
          };
        }
        return column;
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(menuData);
      // Call the updateMenu function to update the menu data in the database
      const response = await updateSubmenu(menuData);
      console.log(response);
      if (response.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Submenu has been updated',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error updating menu data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the submenu.',
        icon: 'error',
      });
    }
  };

  if (!menuData) return <div>Loading...</div>; // Show loading indicator while fetching data

  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Create a new product</Typography>
        <IconButton onClick={() => router.back()} title="Close">
          <CloseIcon className="red" />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Path"
              fullWidth
              value={menuData.path}
              onChange={(e) => handleMenuInputChange('path', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Label"
              fullWidth
              value={menuData.label}
              onChange={(e) => handleMenuInputChange('label', e.target.value)}
            />
          </Grid>
        </Grid>
        {menuData.columns.map((column, columnIndex) => (
          <Grid item xs={12} key={column.id} sx={{ marginBottom: 2 }}>
            <TextField label={`Column ${columnIndex + 1}`} fullWidth sx={{ margin: '5px 0' }} />
            {column.columnItems.map((columnItem, columnItemIndex) => (
              <div key={columnItem.id}>
                <Grid container spacing={1} sx={{ marginBottom: 1 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Path"
                      fullWidth
                      value={columnItem.path}
                      onChange={(e) =>
                        handleColumnItemInputChange(
                          columnIndex,
                          columnItemIndex,
                          'path',
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Label"
                      fullWidth
                      value={columnItem.label}
                      onChange={(e) =>
                        handleColumnItemInputChange(
                          columnIndex,
                          columnItemIndex,
                          'label',
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                </Grid>
                {/* Rendering columnItemItems */}
                {columnItem.columnItemItems.map((columnItemItem, columnItemItemIndex) => (
                  <div key={columnItemItem.id}>
                    <Grid container spacing={1} sx={{ marginBottom: 1 }}>
                      <Grid item xs={6}>
                        <TextField
                          label="Path"
                          fullWidth
                          value={columnItemItem.path}
                          onChange={(e) => {
                            /* handleColumnItemItemInputChange */
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Label"
                          fullWidth
                          value={columnItemItem.label}
                          onChange={(e) => {
                            /* handleColumnItemItemInputChange */
                          }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </div>
            ))}
            <Button
              variant="contained"
              onClick={() => handleColumnItemAdd(columnIndex)}
              sx={{ marginTop: 1, marginBottom: 1 }}
            >
              Add Column Item
            </Button>
            <Button
              variant="contained"
              onClick={() => handleRemoveColumn(columnIndex)}
              sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1 }}
            >
              Remove Column
            </Button>
          </Grid>
        ))}
        <Button variant="contained" onClick={handleColumnAdd}>
          Add Column
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 1 }}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditSubmenu;
