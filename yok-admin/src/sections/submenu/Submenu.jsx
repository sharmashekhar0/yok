/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './submenu.css';
import { useRouter } from 'src/routes/hooks';
import { deleteSubCategory, getSubmenus } from 'src/api/api';
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';

export default function Banner() {
  const [activeButton, setActiveButton] = useState('banner');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const router = useRouter();

  // Fetch menu data by ID when the component mounts
  const fetchMenuData = async () => {
    try {
      const response = await getSubmenus();
      console.log(response.data.CategoryMenu);

      setMenuData(response.data.CategoryMenu); // Assuming the API response contains the menu data
    } catch (error) {
      console.error('Error fetching menu data:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleNewBannerButtonClick = () => {
    router.push('/sub-menu/create');
  };

  const handleDelete = async (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSubCategory(itemId); // Make API call to delete the banner
          Swal.fire({
            title: 'Deleted!',
            text: 'Your Submenu has been deleted.',
            icon: 'success',
          });
          // Refresh the list of banners after deletion
          fetchMenuData();
        } catch (error) {
          console.error('Error deleting Submenu:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the Submenu.',
            icon: 'error',
          });
        }
      }
    });
  };

  const handleEdit = (itemId) => {
    // Handle edit action here
    router.push(`/sub-menu/${itemId}/edit`);

    console.log('Edit item with ID:', itemId);
  };

  // const dummyData = [
  //   { id: 1, label: 'Category A' },
  //   { id: 2, label: 'Category B' },
  //   { id: 3, label: 'Category C' },
  //   { id: 4, label: 'Category D' },
  //   { id: 5, label: 'Category E' },
  //   { id: 6, label: 'Category F' },
  //   { id: 7, label: 'Category G' },
  //   { id: 8, label: 'Category H' },
  //   { id: 9, label: 'Category I' },
  //   { id: 10, label: 'Category J' },
  //   { id: 11, label: 'Category J' },
  // ];

  // useEffect(() => {
  //   setMenuData(dummyData);
  // });

  const totalPages = Math.ceil(menuData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredMenu = menuData.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Submenu</Typography>
        <Button onClick={handleNewBannerButtonClick} variant="contained" color="inherit">
          New Submenu Item
        </Button>
      </Stack>
      <div className="table-container">
        <table className="submenu-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.map((menu) => (
              <React.Fragment key={menu.id}>
                <tr key={menu.id}>
                  <td>{menu.label}</td>
                  <td>
                    <IconButton onClick={() => handleEdit(menu._id)} title="Edit">
                      <EditIcon className="green" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(menu._id)} title="Delete">
                      <DeleteIcon className="red" />
                    </IconButton>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <Stack alignItems={'end'}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      )}
    </Container>
  );
}
