/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Iconify from 'src/components/iconify';
import { Box, IconButton, TextField } from '@mui/material';
import { deleteBanner, getAllBanners } from 'src/api/api';
import NewBanner from './NewBanner';
import './Banner.css';
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [activeButton, setActiveButton] = useState('banner');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleNewBannerButtonClick = () => {
    setActiveButton('newBanner');
  };

  const handleDelete = async (bannerId) => {
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
          await deleteBanner(bannerId); // Make API call to delete the banner
          Swal.fire({
            title: 'Deleted!',
            text: 'Your banner has been deleted.',
            icon: 'success',
          });
          // Refresh the list of banners after deletion
          loadData();
        } catch (error) {
          console.error('Error deleting banner:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the banner.',
            icon: 'error',
          });
        }
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    loadData();
  }, [activeButton]);

  const loadData = async () => {
    try {
      const data = await getAllBanners();
      console.log(data.Banners);
      setBanners(data.Banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const totalPages = Math.ceil(banners?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredBanners = banners
    .filter((banner) => banner.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      {activeButton === 'banner' && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Banners</Typography>
            <Button
              onClick={handleNewBannerButtonClick}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Banner
            </Button>
          </Stack>
          <Box sx={{ width: '50%' }}>
            <TextField
              fullWidth
              label="Search"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>

          <div className="table-container">
            <table className="category-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Desktop Image</th>
                  <th>Mobile Image</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBanners.length > 0 ? (
                  filteredBanners.map((banner, index) => (
                    <tr key={banner._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <img
                          src={banner.image.desktop.url}
                          alt={banner.title}
                          style={{ maxWidth: '100px' }}
                        />
                      </td>
                      <td>
                        <img
                          src={banner.image.mobile.url}
                          alt={banner.title}
                          style={{ maxWidth: '100px' }}
                        />
                      </td>
                      <td>{banner.title}</td>
                      <td>{banner.slug}</td>
                      <td>{banner.position}</td>
                      <td>
                        <IconButton onClick={() => handleDelete(banner._id)} title="Delete">
                          <DeleteIcon className="red" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No banners found</td>
                  </tr>
                )}
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
        </div>
      )}
      {activeButton === 'newBanner' && <NewBanner setActiveButton={setActiveButton} />}
    </Container>
  );
}
