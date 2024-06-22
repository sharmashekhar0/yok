/* eslint-disable */
import React, { useState } from 'react';
import { Stack, TextField, Button, Container, Grid, Typography, IconButton } from '@mui/material';
import { creteSubmenu } from 'src/api/api';
import Swal from 'sweetalert2';
import { useRouter } from 'src/routes/hooks';
import CloseIcon from '@mui/icons-material/Close';

const Submenu = () => {
  const [menuData, setMenuData] = useState([
    {
      id: 1,
      path: '/search?q=men-wear',
      label: 'menu-men-wear',
      columns: [],
    },
  ]);
  const router = useRouter();

  const handleColumnAdd = (menuIndex) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex].columns.push({
      id: newMenuData[menuIndex].columns.length + 1,
      columnItems: [],
    });
    setMenuData(newMenuData);
  };

  const handleColumnItemAdd = (menuIndex, columnIndex) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex].columns[columnIndex].columnItems.push({
      id: newMenuData[menuIndex].columns[columnIndex].columnItems.length + 1,
      path: '',
      label: '',
      columnItemItems: [], // Add an empty array for columnItemItems
    });
    setMenuData(newMenuData);
  };

  const handleColumnItemItemsAdd = (menuIndex, columnIndex, columnItemIndex) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex].columns[columnIndex].columnItems[columnItemIndex].columnItemItems.push({
      id:
        newMenuData[menuIndex].columns[columnIndex].columnItems[columnItemIndex].columnItemItems
          .length + 1,
      path: '',
      label: '',
    });
    setMenuData(newMenuData);
  };

  const handleColumnItemInputChange = (menuIndex, columnIndex, columnItemIndex, field, value) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex].columns[columnIndex].columnItems[columnItemIndex][field] = value;
    setMenuData(newMenuData);
  };

  const handleColumnItemItemInputChange = (
    menuIndex,
    columnIndex,
    columnItemIndex,
    columnItemItemIndex,
    field,
    value
  ) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex].columns[columnIndex].columnItems[columnItemIndex].columnItemItems[
      columnItemItemIndex
    ][field] = value;
    setMenuData(newMenuData);
  };

  const handleRemoveColumn = (menuIndex, columnIndex) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex].columns.splice(columnIndex, 1);
    setMenuData(newMenuData);
  };

  const handleRemoveMenu = (menuIndex) => {
    const newMenuData = [...menuData];
    newMenuData.splice(menuIndex, 1);
    setMenuData(newMenuData);
  };

  const handleMenuInputChange = (menuIndex, field, value) => {
    const newMenuData = [...menuData];
    newMenuData[menuIndex][field] = value;
    setMenuData(newMenuData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Transform menuData into the desired format
    const formattedMenuData = menuData.map((menu) => ({
      id: menu.id,
      path: menu.path,
      label: menu.label,
      columns: menu.columns.map((column) => ({
        id: column.id,
        columnItems: column.columnItems.map((columnItem) => ({
          id: columnItem.id,
          path: columnItem.path,
          label: columnItem.label,
          columnItemItems: columnItem.columnItemItems.map((columnItemItem) => ({
            id: columnItemItem.id,
            path: columnItemItem.path,
            label: columnItemItem.label,
          })),
        })),
      })),
    }));

    try {
      console.log(formattedMenuData);
      // Call the creteSubmenu function to store the data in the database
      const response = await creteSubmenu(...formattedMenuData);
      console.log(response);
      if (response.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Submenu has been created',
          showConfirmButton: false,
          timer: 1500,
        });
        setMenuData([
          {
            id: 1,
            path: '/search?q=men-wear',
            label: 'menu-men-wear',
            columns: [],
          },
        ]);
        router.back();
      }
    } catch (error) {
      console.error('Error storing menu data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create the submenu.',
        icon: 'error',
      });
    }
  };
  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Create a new product</Typography>
        <IconButton onClick={() => router.back()} title="Close">
          <CloseIcon className="red" />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit}>
        {menuData.map((menu, menuIndex) => (
          <div key={menu.id}>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Path"
                  fullWidth
                  value={menu.path}
                  onChange={(e) => handleMenuInputChange(menuIndex, 'path', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Label"
                  fullWidth
                  value={menu.label}
                  onChange={(e) => handleMenuInputChange(menuIndex, 'label', e.target.value)}
                />
              </Grid>
              {menu.columns.map((column, columnIndex) => (
                <Grid item xs={12} key={column.id} sx={{ marginBottom: 2 }}>
                  <TextField
                    label={`Column ${columnIndex + 1}`}
                    fullWidth
                    sx={{ margin: '5px 0' }}
                  />
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
                                menuIndex,
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
                                menuIndex,
                                columnIndex,
                                columnItemIndex,
                                'label',
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                      {columnItem.columnItemItems.map((columnItemItem, columnItemItemIndex) => (
                        <Grid
                          container
                          spacing={1}
                          key={columnItemItem.id}
                          sx={{ marginBottom: 1 }}
                        >
                          <Grid item xs={6}>
                            <TextField
                              label="Path"
                              fullWidth
                              value={columnItemItem.path}
                              onChange={(e) =>
                                handleColumnItemItemInputChange(
                                  menuIndex,
                                  columnIndex,
                                  columnItemIndex,
                                  columnItemItemIndex,
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
                              value={columnItemItem.label}
                              onChange={(e) =>
                                handleColumnItemItemInputChange(
                                  menuIndex,
                                  columnIndex,
                                  columnItemIndex,
                                  columnItemItemIndex,
                                  'label',
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleColumnItemItemsAdd(menuIndex, columnIndex, columnItemIndex)
                        }
                        sx={{ marginTop: 1, marginBottom: 1 }}
                      >
                        Add Column Item Item
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    onClick={() => handleColumnItemAdd(menuIndex, columnIndex)}
                    sx={{ marginTop: 1, marginBottom: 1 }}
                  >
                    Add Column Item
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveColumn(menuIndex, columnIndex)}
                    sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1 }}
                  >
                    Remove Column
                  </Button>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => handleColumnAdd(menuIndex)}>
                  Add Column
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleRemoveMenu(menuIndex)}
                  sx={{ marginLeft: 1 }}
                >
                  Remove Menu
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Submenu;
